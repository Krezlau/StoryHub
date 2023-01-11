import React, { FormEvent, Fragment, useEffect } from "react";
import classes from "./Form.module.css";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../store";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import useValidation from "../../hooks/useValidation";

const LoginForm: React.FC = () => {
  const goBack = useSelector((state: IRootState) => state.redirect.goBack);
  const { isLoading, error, setError, login } = useHttp();
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
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
    setError("");

    if (!emailIsValid && !passwordIsValid) {
      setError("Email invalid, password too short.")
      emailReset();
      passwordReset();
      return;
    }

    if (!emailIsValid) {
      setError("Email invalid.")
      emailReset();
      passwordReset();
      return;
    }

    if (!passwordIsValid) {
      setError("Password too short.")
      passwordReset();
      return;
    }

    login(email.trim(), password.trim());
  };

  return (
    <Fragment>
      <div className={classes.content}>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
          />
          {emailHasError && <p className={classes.errorText}>Email invalid.</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}

          />
          {passwordHasError && <p className={classes.errorText}>Password too short.</p>}
          <div className={classes.actions}>
            {!isLoading && <Button type="submit">Login</Button>}
            {isLoading && <LoadingSpinner />}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginForm;
