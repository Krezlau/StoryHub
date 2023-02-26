import React, { Fragment, useEffect, useState } from "react";
import StoryList from "../components/stories/StoryList";
import PageHeader from "../components/UI/PageHeader";
import useHttp from "../hooks/useHttp";
import { LoadingSpinner } from "../styled/components/UI/UIElements";

export interface IStory {
  id: string;
  title: string;
  author: string;
  userId: string;
  text: string;
  tags: string[];
  createdAt: Date;
}

const AllStoriesPage: React.FC = () => {
  const [stories, setStories] = useState<IStory[]>([]);
  const { isLoading, fetchStories } = useHttp();

  useEffect(() => {
    fetchStories(setStories);
  }, [fetchStories]);

  return (
    <Fragment>
      <PageHeader title={"All stories"} />
      {!isLoading && <StoryList stories={stories} />}
      {isLoading && <LoadingSpinner />}
    </Fragment>
  );
};

export default AllStoriesPage;
