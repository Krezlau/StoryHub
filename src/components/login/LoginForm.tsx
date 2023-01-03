import React, { FormEvent, useRef } from "react";
import classes from "./LoginForm.module.css";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    // validation TODO

    const email = emailRef.current!.value;
    const password = emailRef.current!.value;

    dispatch(authActions.login({ email, password }));
    navigate("/home");
  };

  return (
    <div className={classes.content}>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
        <div className={classes.actions}>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
