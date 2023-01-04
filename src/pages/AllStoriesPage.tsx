import React, { Fragment } from "react";
import StoryList from "../components/stories/StoryList";
import PageHeader from "../components/UI/PageHeader";

const AllStoriesPage: React.FC = () => {
  return (
    <Fragment>
      <PageHeader title={"All stories"} />
      <StoryList />{" "}
    </Fragment>
  );
};

export default AllStoriesPage;
