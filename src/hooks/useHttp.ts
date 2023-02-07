import { useCallback, useState } from "react";
import { loginUser, signUpUser, useAuthDispatch } from "../store/auth-actions";
import axios from "axios";
import { IUser } from "../pages/ProfilePage";
import useNotification from "./useNotification";
import { NavigateFunction } from "react-router-dom";
import { IComment } from "../components/stories/StoryCommentsList";
import { IStory } from "../pages/AllStoriesPage";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useAuthDispatch();

  useNotification(error, setError);

  const login = (email: string, password: string) => {
    dispatch(loginUser(email, password, setIsLoading, setError));
  };
  const signUp = (username: string, email: string, password: string) => {
    dispatch(signUpUser(username, email, password, setIsLoading, setError));
  };

  const fetchStories = useCallback(
    async (setStories: (newState: IStory[]) => void, userId?: string) => {
      setIsLoading(true);
      setError("");

      const fetchStoriesFromDB = async () => {
        const response = await axios.get(
          "https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories.json"
        );

        if (response.status > 299) {
          throw new Error("Could not fetch.");
        }

        return response.data;
      };

      try {
        const storiesData = await fetchStoriesFromDB();
        const stories: IStory[] = [];

        for (const key in storiesData) {
          stories.push({
            id: key,
            userId: storiesData[key].userId,
            author: storiesData[key].author,
            text: storiesData[key].text,
            title: storiesData[key].title,
            tags: storiesData[key].tags,
            createdAt: new Date(storiesData[key].createdAt),
          });
        }

        if (userId) {
          setStories(stories.filter((story) => story.userId === userId));
        } else {
          setStories(stories);
        }
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
        "https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories.json",
        story,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status > 299) {
        throw new Error("Could not send data.");
      }

      return response.data.name;
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
    userToken: string,
    newPassword: string,
    navigate: NavigateFunction
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBX14QGRIuDqIQ830ByACAAXgJBpdeYNYE",
        { idToken: userToken, password: newPassword, returnSecureToken: true },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status !== 200) {
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
        `https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories/${storyId}/comments.json`
      );
      if (response.status > 299) {
        throw new Error();
      }
      const data = response.data;

      for (const key in data) {
        comments.push({
          id: key,
          text: data[key].comment.text,
          createdAt: data[key].comment.createdAt,
          authorName: data[key].comment.authorName,
          authorId: data[key].comment.authorId,
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
        `https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories/${storyId}/comments.json`,
        { comment },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status > 299) {
        throw new Error();
      }

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not fetch comments. Try again.");
    }
  };

  const fetchStory = useCallback(async (storyId: string) => {
    setIsLoading(true);
    setError("");
    let story: IStory;

    try {
      const response = await axios.get(
        `https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories/${storyId}.json`
      );
      if (response.status > 299) {
        throw new Error();
      }
      const data = response.data;

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
  
  const deleteStory = useCallback( async (storyId: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.delete(`https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories/${storyId}.json`);
      if (response.status > 299) {
        throw new Error();
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not fetch user data.");
    }
  }, [])

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
