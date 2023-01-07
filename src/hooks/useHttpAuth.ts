import {useState} from "react";
import {loginUser, signUpUser, useAuthDispatch} from "../store/auth-actions";

const useHttpAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useAuthDispatch();

  const login = (email: string, password: string) => {
    setIsLoading(true);
    dispatch(loginUser(email, password, setIsLoading, setError));
  };
  const signUp = (username: string, email: string, password: string) => {
    dispatch(signUpUser(username, email, password, setIsLoading, setError));
  };

  return {isLoading, error, login, signUp};
};

export default useHttpAuth;
