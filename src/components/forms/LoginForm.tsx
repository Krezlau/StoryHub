import React, { FormEvent, Fragment } from "react";
import useHttp from "../../hooks/useHttp";
import useValidation from "../../hooks/useValidation";
import useLoginRedirect from "../../hooks/useLoginRedirect";
import {
  FormActions,
  FormContent,
  FormErrorText,
} from "../../styled/components/forms/Form";
import {Button, LoadingSpinner} from "../../styled/components/UI/UIElements";

const LoginForm: React.FC = () => {
  const { isLoading, error, setError, login } = useHttp();

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: usernameReset,
  } = useValidation((value) => value.trim().length > 5);
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useValidation((value) => value.trim().length >= 8);

  useLoginRedirect(error, isLoading);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!usernameIsValid && !passwordIsValid) {
      setError("Email invalid, password too short.");
      usernameReset();
      passwordReset();
      return;
    }

    if (!usernameIsValid) {
      setError("Email invalid.");
      usernameReset();
      passwordReset();
      return;
    }

    if (!passwordIsValid) {
      setError("Password too short.");
      passwordReset();
      return;
    }

    login(username.trim(), password.trim());
  };

  return (
    <Fragment>
      <FormContent>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            onBlur={usernameBlurHandler}
            onChange={usernameChangeHandler}
          />
          {usernameHasError && <FormErrorText>Email invalid.</FormErrorText>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
          />
          {passwordHasError && (
            <FormErrorText>Password too short.</FormErrorText>
          )}
          <FormActions>
            {!isLoading && <Button type="submit">Login</Button>}
            {isLoading && <LoadingSpinner />}
          </FormActions>
        </form>
      </FormContent>
    </Fragment>
  );
};

export default LoginForm;
