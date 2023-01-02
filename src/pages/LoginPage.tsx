import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    // validation

    dispatch(authActions.login({ email: "email", password: "password" }));
    navigate("/home");
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='email'>Email</label>
      <input type="email" />
      <label htmlFor='password'>Password</label>
      <input type="password" />
      <button>Login</button>
    </form>
  );
};

export default LoginPage;