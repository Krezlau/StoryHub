import React, { FormEvent, Fragment, useEffect, useRef } from "react";
import classes from "./Form.module.css";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../store";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import useValidation from "../../hooks/useValidation";

const SignUpForm: React.FC = () => {
  const goBack = useSelector((state: IRootState) => state.redirect.goBack);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
  const { isLoading, error, signUp } = useHttp();

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useValidation((value) => value.trim().length > 3 && value.includes("@"));

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useValidation((value) => value.trim().length >= 8);

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: usernameReset,
  } = useValidation((value) => value.trim().length >= 5);


  // make a hook out of it?
  // its duplicated
  useEffect(() => {
    if (isLoggedIn) {
      if (goBack) {
        navigate(-1);
        return;
      }
      navigate("/home");
    }
    if (!isLoading && error !== "") {
      console.log(error);
      return;
    }
  }, [error, goBack, isLoading, isLoggedIn, navigate]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();


    // validate

    signUp(username, email, password);
  };

  return (
    <Fragment>
      <div className={classes.content}>
        <form onSubmit={submitHandler}>
          <label htmlFor="nickname">Username</label>
          <input type="text" id="username" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <div className={classes.actions}>
            {!isLoading && <Button type="submit">Sign Up</Button>}
            {isLoading && <LoadingSpinner />}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUpForm;
