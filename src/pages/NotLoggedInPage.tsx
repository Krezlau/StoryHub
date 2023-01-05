import React, { Fragment } from "react";
import PageHeader from "../components/UI/PageHeader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { redirectActions } from "../store/redirect-slice";

const NotLoggedInPage: React.FC<{ doNotGoBack?: boolean }> = (props) => {
  const dispatch = useDispatch();

  if (!props.doNotGoBack) {
    dispatch(redirectActions.enable());
  }

  return (
    <Fragment>
      <PageHeader title={"You need to be logged in to view this page."} />
      <Link to="/login">Log in now</Link>
    </Fragment>
  );
};

export default NotLoggedInPage;
