import { useCallback, useState } from "react";
import { loginUser, useAuthDispatch } from "../store/auth-actions";
import axios, {AxiosError} from "axios";
import { IUser } from "../pages/ProfilePage";
import useNotification from "./useNotification";
import { NavigateFunction } from "react-router-dom";
import { IComment } from "../components/stories/StoryCommentsList";
import { IStory } from "../pages/AllStoriesPage";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import {authActions} from "../store/auth-slice";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [notificationTitle, setNotificationTitle] = useState<string>("");
  const dispatch = useAuthDispatch();
  const accessToken = useSelector((state: IRootState) => state.auth.userToken);

  useNotification(notificationTitle, setNotificationTitle, error, setError);

  const refreshToken = () =>
  {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return null;
    }
    try {
      let token;
      axios.post(
        "https://storyhubapi.azurewebsites.net/api/auth/refresh",
        { accessToken, refreshToken },
        { headers: { "Content-Type": "application/json" } }
      )
        .then((r) => {
          localStorage.setItem("token", r.data.result);
          token = r.data.result;
          dispatch(authActions.refresh(token))
        })
      return token;
    } catch (e) {
      return null;
    }
  }

  const handleAxiosError = (e: unknown) => {
    if (e instanceof AxiosError) {
      const axios: AxiosError = e;
      if (axios.response && axios.response.status === 401){
        const token = refreshToken();
        if (token) {
          setNotificationTitle("Something went wrong.");
          setError("Don't worry. Try again. It should work this time.");
          return true;
        }
      }
    }
    return false;
  }

  const login = (email: string, password: string) => {
    dispatch(loginUser(email, password, setIsLoading, setError));
  };
  const signUp = async (
    username: string,
    email: string,
    password: string,
    navigate: NavigateFunction
  ) => {
    setIsLoading(true);
    setError("");
    setNotificationTitle("");

    const signUp = async () => {
      const response = await axios.post(
        "https://storyhubapi.azurewebsites.net/api/auth/register",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response.data.isSuccess) {
        throw new Error();
      }
    };

    try {
      await signUp();

      setIsLoading(false);
      setError("");
      setNotificationTitle("");
      navigate("/login");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setNotificationTitle("Something went wrong.");
      setError("Something unexpected happened. Try again.");
    }
  };

  const fetchStories = useCallback(
    async (setStories: (newState: IStory[]) => void, userId?: string) => {
      setIsLoading(true);
      setNotificationTitle("");
      setError("");

      const fetchStoriesFromDB = async () => {
        const response = await axios.get(
          "https://storyhubapi.azurewebsites.net/api/stories",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.data.isSuccess) {
          throw new Error();
        }

        return response.data.result;
      };

      const fetchUserStoriesFromDB = async (userId: string) => {
        const response = await axios.get(
          `https://storyhubapi.azurewebsites.net/api/stories/byuserid/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.data.isSuccess) {
          throw new Error();
        }

        return response.data.result;
      };

      try {
        let storiesData;
        if (userId){
          storiesData = await fetchUserStoriesFromDB(userId);
        } else {
          storiesData = await fetchStoriesFromDB();
        }
        const stories: IStory[] = [];

        for (const key in storiesData) {
          stories.push({
            id: storiesData[key].id,
            userId: storiesData[key].authorId,
            author: storiesData[key].authorName,
            text: storiesData[key].text,
            title: storiesData[key].title,
            tags: storiesData[key].tags,
            createdAt: new Date(storiesData[key].createdAt),
          });
        }
        setStories(stories);

        setIsLoading(false);
        setNotificationTitle("");
        setError("");
      } catch (e) {
        setIsLoading(false);
        if (!handleAxiosError(e)){
          console.log(e);
          setNotificationTitle("Something went wrong.");
          setError("Could not fetch stories. Try again.");
        }
      }
    },
    [accessToken]
  );

  const fetchUser = useCallback(async (id: string) => {
    setIsLoading(true);
    setNotificationTitle("");
    setError("");

    try {
      const response = await axios.get(
        `https://storyhubapi.azurewebsites.net/api/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.data.isSuccess) {
        throw new Error();
      }
      const data = response.data.result;
      const user: IUser = {
        name: data.username,
        email: data.email,
        created: data.createdAt,
      };

      setIsLoading(false);
      setNotificationTitle("");
      setError("");
      return user;
    } catch (e) {
      setIsLoading(false);
      if (!handleAxiosError(e)){
        console.log(e);
        setNotificationTitle("Something went wrong.");
        setError("Could not fetch user data. Try again.");
      }
    }
  }, [accessToken]);

  const addNewStory = useCallback(async (story: IStory) => {
    setIsLoading(true);
    setNotificationTitle("");
    setError("");

    const sendStoryToDB = async () => {
      const response = await axios.post(
        "https://storyhubapi.azurewebsites.net/api/stories",
        { title: story.title, text: story.text, tags: story.tags },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.isSuccess) {
        throw new Error();
      }

      return response.data.result;
    };

    try {
      story.id = await sendStoryToDB();
      setError("");
      setNotificationTitle("");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (!handleAxiosError(e)){
        console.log(e);
        setNotificationTitle("Something went wrong.");
        setError("Could not send data. Try again.");
      }
    }
  }, [accessToken]);

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    navigate: NavigateFunction
  ) => {
    setIsLoading(true);
    setNotificationTitle("");
    setError("");

    try {
      const response = await axios.post(
        "https://storyhubapi.azurewebsites.net/api/auth/change-password",
        { newPassword: newPassword, currentPassword: currentPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.data.isSuccess) {
        throw new Error();
      }

      setIsLoading(false);
      setError("");
      setNotificationTitle("");
      navigate(-1);
    } catch (e) {
      setIsLoading(false);
      if (!handleAxiosError(e)){
        console.log(e);
        setNotificationTitle("Something went wrong.");
        setError("Could not change. Try again.");
      }
    }
  };

  const fetchComments = useCallback(async (storyId: string) => {
    setIsLoading(true);
    setNotificationTitle("");
    setError("");
    const comments: IComment[] = [];

    try {
      const response = await axios.get(
        `https://storyhubapi.azurewebsites.net/api/comments/story/${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.data.isSuccess) {
        throw new Error();
      }
      const data = response.data.result;

      for (const key in data) {
        comments.push({
          id: data[key].id,
          text: data[key].text,
          createdAt: data[key].createdAt,
          authorName: data[key].username,
          authorId: data[key].userId,
        });
      }

      setNotificationTitle("");
      setIsLoading(false);
      setError("");
    } catch (e) {
      setIsLoading(false);
      if (!handleAxiosError(e)){
        console.log(e);
        setNotificationTitle("Something went wrong.");
        setError("Could not fetch comments data. Try again.");
      }
    }
    return comments;
  }, [accessToken]);

  const addComment = async (comment: IComment, storyId: string) => {
    setIsLoading(true);
    setNotificationTitle("");
    setError("");

    try {
      const response = await axios.post(
        `https://storyhubapi.azurewebsites.net/api/comments/story/${storyId}`,
        { text: comment.text },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.data.isSuccess) {
        throw new Error();
      }

      setError("");
      setNotificationTitle("");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (!handleAxiosError(e)){
        console.log(e);
        setNotificationTitle("Something went wrong.");
        setError("Could not add comment. Try again.");
      }
    }
  };

  const fetchStory = useCallback(async (storyId: string) => {
    setIsLoading(true);
    setNotificationTitle("");
    setError("");
    let story: IStory;

    try {
      const response = await axios.get(
        `https://storyhubapi.azurewebsites.net/api/Stories/${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.data.isSuccess) {
        throw new Error();
      }
      const data = response.data.result;

      console.log(data);
      story = {
        id: storyId,
        text: data.text,
        tags: data.tags,
        userId: data.authorId,
        title: data.title,
        author: data.authorName,
        createdAt: new Date(data.createdAt),
      };

      setError("");
      setNotificationTitle("");
      setIsLoading(false);
      return story;
    } catch (e) {
      setIsLoading(false);
      if (!handleAxiosError(e)){
        console.log(e);
        setNotificationTitle("Something went wrong.");
        setError("Could not fetch story. Try again.");
      }
    }
  }, [accessToken]);

  const deleteStory = useCallback(async (storyId: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.delete(
        `https://storyhubapi.azurewebsites.net/api/Stories/${storyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.data.isSuccess) {
        throw new Error();
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (!handleAxiosError(e)){
        console.log(e);
        setNotificationTitle("Something went wrong.");
        setError("Could not delete. Try again.");
      }
    }
  }, [accessToken]);



  return {
    isLoading,
    notificationTitle,
    setNotificationTitle,
    error,
    setError,
    login,
    signUp,
    fetchStories,
    fetchUser,
    addNewStory,
    changePassword,
    fetchComments,
    addComment,
    fetchStory,
    deleteStory,
  };
};

export default useHttp;
