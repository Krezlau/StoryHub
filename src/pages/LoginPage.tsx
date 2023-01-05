import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import PageHeader from "../components/UI/PageHeader";

const LoginPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={'Login'} />
        <LoginForm />
      <p>
        or <Link to="/signup">sign up</Link>
      </p>
    </Fragment>
  );
};

export default LoginPage;
