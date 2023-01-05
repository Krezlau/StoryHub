import React, { Fragment } from "react";
import PageHeader from "../components/UI/PageHeader";
import SignUpForm from "../components/forms/SignUpForm";

const SignUpPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={"Sign up"} />
      <SignUpForm />
    </Fragment>
  );
};

export default SignUpPage;