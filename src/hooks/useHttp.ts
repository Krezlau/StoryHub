import {useCallback, useState} from "react";
import {loginUser, signUpUser, useAuthDispatch} from "../store/auth-actions";
import {addStory, fetchAllStories} from "../store/stories-actions";
import axios from "axios";
import {IUser} from "../pages/ProfilePage";
import {IStory} from "../store/stories-slice";
import useNotification from "./useNotification";
import {NavigateFunction} from "react-router-dom";
import {IComment} from "../components/stories/StoryCommentsList";

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

  const fetchStories = useCallback(() => {
    dispatch(fetchAllStories(setIsLoading, setError));
  }, [dispatch]);

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

  const addNewStory = (story: IStory) => {
    dispatch(addStory(story, setIsLoading, setError));
  };

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
        {idToken: userToken, password: newPassword, returnSecureToken: true},
        {headers: {"Content-Type": "application/json"}}
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
          text: data[key].text,
          createdAt: data[key].createdAt,
          authorName: data[key].authorName,
          authorId: data[key].authorId,
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
        {comment},
        {headers: {"Content-Type": "application/json"}}
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
  };
};

export default useHttp;
