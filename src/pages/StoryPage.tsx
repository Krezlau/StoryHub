import React, { Fragment } from "react";
import PageHeader from "../components/UI/PageHeader";
import StoryDetails from "../components/stories/StoryDetails";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import CommentForm from "../components/forms/CommentForm";
import StoryCommentsList from "../components/stories/StoryCommentsList";
import StoryCommentsContent from "../components/stories/StoryCommentsContent";

const StoryPage: React.FC = () => {
  const { storyId } = useParams<{ storyId?: string }>();

  let storyIdParam: string;

  if (!!storyId) {
    storyIdParam = storyId;
  }

  const story = useSelector((state: IRootState) =>
    state.stories.stories.find((s) => s.id === storyIdParam)
  );

  return (
    <Fragment>
      <PageHeader title={story ? story.title : "404"} />
      <StoryDetails story={story} />
      <StoryCommentsContent storyId={storyId ? storyId : ""} count={2} />
    </Fragment>
  );
};

export default StoryPage;