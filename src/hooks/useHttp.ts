import { useCallback, useState } from "react";
import { loginUser, useAuthDispatch } from "../store/auth-actions";
import axios from "axios";
import { IUser } from "../pages/ProfilePage";
import useNotification from "./useNotification";
import { NavigateFunction } from "react-router-dom";
import { IComment } from "../components/stories/StoryCommentsList";
import { IStory } from "../pages/AllStoriesPage";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useAuthDispatch();
  const accessToken = useSelector((state: IRootState) => state.auth.userToken);

  useNotification(error, setError);

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

    const signUp = async () => {
      const response = await axios.post(
        "https://storyhubapi.azurewebsites.net/api/auth/register",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response.data.isSuccess) {
        throw new Error("Response incorrect.");
      }
    };

    try {
      await signUp();

      setIsLoading(false);
      setError("");
      navigate("/login");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not sign up.");
    }
  };

  const fetchStories = useCallback(
    async (setStories: (newState: IStory[]) => void) => {
      setIsLoading(true);
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
          throw new Error("Could not fetch.");
        }

        return response.data.result;
      };

      try {
        const storiesData = await fetchStoriesFromDB();
        const stories: IStory[] = [];

        for (const key in storiesData) {
          stories.push({
            id: storiesData[key].id,
            userId: storiesData[key].userId,
            author: storiesData[key].author,
            text: storiesData[key].text,
            title: storiesData[key].title,
            tags: storiesData[key].tags,
            createdAt: new Date(storiesData[key].createdAt),
          });
        }
        setStories(stories);

        setIsLoading(false);
        setError("");
      } catch (e) {
        console.log(e);
        setError("Could not fetch stories.");
        setIsLoading(false);
      }
    },
    []
  );

  const fetchUser = useCallback(async (id: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`
      );
      if (response.status > 299) {
        throw new Error();
      }
      const data = response.data;
      const user: IUser = {
        name: data.name,
        email: data.email,
        created: data.created,
      };

      setIsLoading(false);
      return user;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not fetch user data.");
    }
  }, []);

  const addNewStory = useCallback(async (story: IStory) => {
    setIsLoading(true);
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
        throw new Error("Could not send data.");
      }

      return response.data.result;
    };

    try {
      story.id = await sendStoryToDB();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError("Could not send data.");
      setIsLoading(false);
    }
  }, []);

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    navigate: NavigateFunction
  ) => {
    setIsLoading(true);
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
        throw new Error("Status not ok.");
      }

      setIsLoading(false);
      navigate(-1);
    } catch (e) {
      console.log(e);
      setError("Could not change.");
      setIsLoading(false);
    }
  };

  const fetchComments = useCallback(async (storyId: string) => {
    setIsLoading(true);
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

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not fetch user data.");
    }
    return comments;
  }, []);

  const addComment = async (comment: IComment, storyId: string) => {
    setIsLoading(true);
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

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not add comment. Try again.");
    }
  };

  const fetchStory = useCallback(async (storyId: string) => {
    setIsLoading(true);
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
        userId: data.userId,
        title: data.title,
        author: data.author,
        createdAt: new Date(data.createdAt),
      };

      setIsLoading(false);
      return story;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not fetch user data.");
    }
  }, []);

  const deleteStory = useCallback(async (storyId: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.delete(
        `https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories/${storyId}.json`
      );
      if (response.status > 299) {
        throw new Error();
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not fetch user data.");
    }
  }, []);

  return {
    isLoading,
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
