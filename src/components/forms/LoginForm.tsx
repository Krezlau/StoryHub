import React, { FormEvent, Fragment, useEffect, useRef } from "react";
import classes from "./Form.module.css";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../store";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";

const LoginForm: React.FC = () => {
  const goBack = useSelector((state: IRootState) => state.redirect.goBack);
  const { isLoading, error, login } = useHttp();
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

    // validation TODO

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    login(email, password);
  };

  return (
    <Fragment>
      <div className={classes.content}>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} />
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
