import React, { Fragment } from "react";
import PageHeader from "../components/UI/PageHeader";
import {Link} from "react-router-dom";

const NotLoggedInPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={"You need to be logged in to view this page."} />
      <Link to='/login'>Log in now</Link>
    </Fragment>
  );
};

export default NotLoggedInPage;