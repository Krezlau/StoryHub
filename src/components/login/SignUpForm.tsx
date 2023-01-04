import React, { FormEvent, useRef } from "react";
import classes from "./LoginForm.module.css";
import Button from "../UI/Button";
import { authActions } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../store";

const SignUpForm: React.FC = () => {
  const goBack = useSelector((state: IRootState) => state.redirect.goBack);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const nickname = nicknameRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    // validate

    dispatch(authActions.register({ nickname, email, password }));

    if (goBack) {
      navigate(-1);
      return;
    }
    navigate("/home");
  };

  return (
    <div className={classes.content}>
      <form onSubmit={submitHandler}>
        <label htmlFor="nickname">Nickname</label>
        <input type="text" id="nickname" ref={nicknameRef} />
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
