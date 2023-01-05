import React, { Fragment } from "react";
import StoryList from "../components/stories/StoryList";
import PageHeader from "../components/UI/PageHeader";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

const AllStoriesPage: React.FC = () => {
  const stories = useSelector((state: IRootState) => state.stories.stories);

  return (
    <Fragment>
      <PageHeader title={"All stories"} />
      <StoryList stories={stories} />
    </Fragment>
  );
};

export default AllStoriesPage;
