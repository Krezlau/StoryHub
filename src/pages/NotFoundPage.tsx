import React, { Fragment } from "react";
import PageHeader from "../components/UI/PageHeader";

const NotFoundPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={"404"} />
      <h1>Page not found.</h1>
    </Fragment>
  );
};

export default NotFoundPage;
