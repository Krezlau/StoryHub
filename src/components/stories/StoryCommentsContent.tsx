import React from "react";
import CommentForm from "../forms/CommentForm";
import StoryCommentsList from "./StoryCommentsList";
import {CommentsCountLabel} from "../../styled/components/stories/Comments";

const StoryCommentsContent: React.FC<{count: number, storyId: string}> = (props) => {
  return <>
  <CommentsCountLabel>{props.count} Comments</CommentsCountLabel>
    <CommentForm />
    <StoryCommentsList storyId={props.storyId} />
  </>
}

export default StoryCommentsContent;
