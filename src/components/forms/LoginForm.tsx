import React, { FormEvent, useRef } from "react";
import classes from "./Form.module.css";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../../store";

const LoginForm: React.FC = () => {
  const goBack = useSelector((state: IRootState) => state.redirect.goBack);
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

    if (goBack) {
      navigate(-1);
      return;
    }
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
