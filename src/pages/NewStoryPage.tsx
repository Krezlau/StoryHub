import React, { Fragment } from "react";
import PageHeader from "../components/UI/PageHeader";
import NewStoryForm from "../components/forms/NewStoryForm";

const NewStoryPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={"Post a story"} />
      <NewStoryForm />
    </Fragment>
  );
};

export default NewStoryPage;
