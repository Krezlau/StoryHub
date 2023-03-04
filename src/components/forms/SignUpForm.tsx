import React, { FormEvent, Fragment } from "react";
import useHttp from "../../hooks/useHttp";
import useValidation from "../../hooks/useValidation";
import {
  FormActions,
  FormContent,
  FormErrorText,
} from "../../styled/components/forms/Form";
import { Button, LoadingSpinner } from "../../styled/components/UI/UIElements";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const { isLoading, setError, signUp, setNotificationTitle } = useHttp();
  const navigate = useNavigate();

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

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!emailIsValid && !passwordIsValid && !usernameIsValid) {
      setNotificationTitle("Could not register");
      setError("Email invalid, password too short, username too short.");
      usernameReset();
      emailReset();
      passwordReset();
      return;
    }

    if (!emailIsValid) {
      setNotificationTitle("Could not register");
      setError("Email invalid.");
      usernameReset();
      emailReset();
      passwordReset();
      return;
    }

    if (!passwordIsValid) {
      setNotificationTitle("Could not register");
      setError("Password too short.");
      usernameReset();
      emailReset();
      passwordReset();
      return;
    }

    if (!usernameIsValid) {
      setNotificationTitle("Could not register");
      setError("Username too short.");
      usernameReset();
      emailReset();
      passwordReset();
    }

    signUp(username, email, password, navigate);
  };

  return (
    <Fragment>
      <FormContent>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onBlur={usernameBlurHandler}
            onChange={usernameChangeHandler}
          />
          {usernameHasError && (
            <FormErrorText>Username too short.</FormErrorText>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
          {emailHasError && <FormErrorText>Email invalid.</FormErrorText>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
          />
          {passwordHasError && (
            <FormErrorText>Password too short.</FormErrorText>
          )}
          <FormActions>
            {!isLoading && <Button type="submit">Sign Up</Button>}
            {isLoading && <LoadingSpinner />}
          </FormActions>
        </form>
      </FormContent>
    </Fragment>
  );
};

export default SignUpForm;
