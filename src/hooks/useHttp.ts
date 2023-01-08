import {useCallback, useState} from "react";
import { loginUser, signUpUser, useAuthDispatch } from "../store/auth-actions";
import {addStory, fetchAllStories} from "../store/stories-actions";
import axios from "axios";
import {IUser} from "../pages/ProfilePage";
import {IStory} from "../store/stories-slice";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useAuthDispatch();

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

    try{
      const response = await axios.get(`https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
      if (response.status > 299) {
        throw new Error();
      }
      const data = response.data;
      const user: IUser = {name: data.name, email: data.email, created: data.created}

      setIsLoading(false);
      return user;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not fetch user data.")
    }
  }, [])

  const addNewStory = (story: IStory) => {
    dispatch(addStory(story, setIsLoading, setError))
  }

  return { isLoading, error, login, signUp, fetchStories, fetchUser, addNewStory };
};

export default useHttp;
