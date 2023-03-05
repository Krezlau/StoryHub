import React, { Fragment, useEffect, useState } from "react";
import PageHeader from "../components/UI/PageHeader";
import StoryDetails from "../components/stories/StoryDetails";
import { useParams } from "react-router-dom";
import StoryCommentsContent from "../components/stories/StoryCommentsContent";
import useHttp from "../hooks/useHttp";
import { LoadingSpinner } from "../styled/components/UI/UIElements";
import { IStory } from "./AllStoriesPage";

const StoryPage: React.FC = () => {
  const { storyId } = useParams<{ storyId?: string }>();
  const { isLoading, fetchStory } = useHttp();
  const [story, setStory] = useState<IStory>();

  useEffect(() => {
    if (storyId) {
      fetchStory(storyId).then((res) => {
        setStory(res);
      });
    }
  }, [fetchStory, storyId]);

  const updateStoryLikes = (newLikeCount: number) => {
    if (!story) return;
    setStory((prevState) => {
      if (prevState){
        return { ...prevState, likesCount: newLikeCount };
      }
    });
  };

  return (
    <Fragment>
      <PageHeader title={story ? story.title : "404"} />
      {!isLoading && <StoryDetails story={story} onLike={updateStoryLikes}/>}
      {isLoading && <LoadingSpinner />}
      <StoryCommentsContent storyId={storyId ? storyId : ""} />
    </Fragment>
  );
};

export default StoryPage;