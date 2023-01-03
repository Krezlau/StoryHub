import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Fragment>
      <h1>Login</h1>
      <LoginForm />
      <p>
        or <Link to="/signup">sign up</Link>
      </p>
    </Fragment>
  );
};

export default LoginPage;
