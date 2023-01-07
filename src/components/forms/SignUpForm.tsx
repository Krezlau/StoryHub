import React, { FormEvent, useRef } from "react";
import classes from "./Form.module.css";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../store";
import { singUpUser, useAuthDispatch } from "../../store/auth-actions";

const SignUpForm: React.FC = () => {
  const goBack = useSelector((state: IRootState) => state.redirect.goBack);
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const username = usernameRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    // validate

    dispatch(
      singUpUser(
        username,
        email,
        password,
        (newState) => {
          console.log(newState);
        },
        (newState) => {
          console.log(newState);
        }
      )
    );

    if (goBack) {
      navigate(-1);
      return;
    }
    navigate("/home");
  };

  return (
    <div className={classes.content}>
      <form onSubmit={submitHandler}>
        <label htmlFor="nickname">Username</label>
        <input type="text" id="username" ref={usernameRef} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
        <div className={classes.actions}>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
