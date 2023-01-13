import React, { Fragment, useEffect } from "react";
import StoryList from "../components/stories/StoryList";
import PageHeader from "../components/UI/PageHeader";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import useHttp from "../hooks/useHttp";
import {LoadingSpinner} from "../styled/components/UI/UIElements";

const AllStoriesPage: React.FC = () => {
  const { isLoading, fetchStories } = useHttp();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);


  const stories = useSelector((state: IRootState) => state.stories.stories);

  return (
    <Fragment>
      <PageHeader title={"All stories"} />
      {!isLoading && <StoryList stories={stories} />}
      {isLoading && <LoadingSpinner />}
    </Fragment>
  );
};

export default AllStoriesPage;
