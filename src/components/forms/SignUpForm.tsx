import React, { FormEvent, Fragment } from "react";
import classes from "./Form.module.css";
import Button from "../UI/Button";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import useValidation from "../../hooks/useValidation";
import useLoginRedirect from "../../hooks/useLoginRedirect";

const SignUpForm: React.FC = () => {
  const { isLoading, error, setError, signUp } = useHttp();

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

  useLoginRedirect(error, isLoading);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!emailIsValid && !passwordIsValid && !usernameIsValid) {
      setError("Email invalid, password too short, username too short.")
      usernameReset();
      emailReset();
      passwordReset();
      return;
    }

    if (!emailIsValid) {
      setError("Email invalid.")
      usernameReset();
      emailReset();
      passwordReset();
      return;
    }

    if (!passwordIsValid) {
      setError("Password too short.")
      usernameReset();
      emailReset();
      passwordReset();
      return;
    }

    if (!usernameIsValid) {
      setError("Username too short.")
      usernameReset();
      emailReset();
      passwordReset();
    }

    signUp(username, email, password);
  };

  return (
    <Fragment>
      <div className={classes.content}>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onBlur={usernameBlurHandler}
            onChange={usernameChangeHandler}
          />
          {usernameHasError && <p className={classes["error-text"]}>Username too short.</p>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
          {emailHasError && <p className={classes["error-text"]}>Email invalid.</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
          />
          {passwordHasError && <p className={classes["error-text"]}>Password too short.</p>}
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
