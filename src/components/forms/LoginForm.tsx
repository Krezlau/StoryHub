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

  useLoginRedirect(error, isLoading);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!emailIsValid && !passwordIsValid) {
      setError("Email invalid, password too short.");
      emailReset();
      passwordReset();
      return;
    }

    if (!emailIsValid) {
      setError("Email invalid.");
      emailReset();
      passwordReset();
      return;
    }

    if (!passwordIsValid) {
      setError("Password too short.");
      passwordReset();
      return;
    }

    login(email.trim(), password.trim());
  };

  return (
    <Fragment>
      <FormContent>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
          {emailHasError && <FormErrorText>Email invalid.</FormErrorText>}
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
