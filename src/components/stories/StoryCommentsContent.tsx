import React, { useState } from "react";
import CommentForm from "../forms/CommentForm";
import StoryCommentsList, { IComment } from "./StoryCommentsList";
import { CommentsCountLabel } from "../../styled/components/stories/Comments";

const DUMMYCOMMENTS: IComment[] = [
  {
    authorId: "1",
    authorName: "Krezlau",
    text: "That's a really interesting story1.",
    id: "1",
    createdAt: new Date().toDateString(),
  },
  {
    authorId: "1",
    authorName: "Krezlau",
    text: "That's a really interesting story2.",
    id: "2",
    createdAt: new Date().toDateString(),
  },
  {
    authorId: "1",
    authorName: "Krezlau",
    text: "That's a really interesting story3.",
    id: "3",
    createdAt: new Date().toDateString(),
  },
];

const StoryCommentsContent: React.FC<{ count: number; storyId: string }> = (
  props
) => {
  const [comments, setComments] = useState<IComment[]>(DUMMYCOMMENTS);

  const commentAddHandler = (comment: IComment) => {
    setComments((comments) => [comment, ...comments]);
  };

  return (
    <>
      <CommentsCountLabel>{props.count} Comments</CommentsCountLabel>
      <CommentForm addComment={commentAddHandler} />
      <StoryCommentsList comments={comments} />
    </>
  );
};

export default StoryCommentsContent;
