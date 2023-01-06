import React, {Fragment, useEffect} from "react";
import StoryList from "../components/stories/StoryList";
import PageHeader from "../components/UI/PageHeader";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import {fetchAllStories, useStoriesDispatch} from "../store/stories-actions";

const AllStoriesPage: React.FC = () => {
  const dispatch = useStoriesDispatch();

  useEffect(() => {
    dispatch(fetchAllStories());
  }, [dispatch])

  const stories = useSelector((state: IRootState) => state.stories.stories);

  return (
    <Fragment>
      <PageHeader title={"All stories"} />
      <StoryList stories={stories} />
    </Fragment>
  );
};

export default AllStoriesPage;
