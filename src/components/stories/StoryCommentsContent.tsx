import React, {useEffect, useState} from "react";
import CommentForm from "../forms/CommentForm";
import StoryCommentsList, { IComment } from "./StoryCommentsList";
import { CommentsCountLabel } from "../../styled/components/stories/Comments";
import useHttp from "../../hooks/useHttp";
import {LoadingSpinner} from "../../styled/components/UI/UIElements";

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

const StoryCommentsContent: React.FC<{ storyId: string }> = (
  props
) => {
  const [comments, setComments] = useState<IComment[]>(DUMMYCOMMENTS);
  const {isLoading, fetchComments, addComment, setError, setNotificationTitle} = useHttp();

  useEffect( () => {
    fetchComments(props.storyId).then(res => setComments(res));
  }, [fetchComments, props.storyId])

  const commentAddHandler = (comment: IComment) => {
    setComments((comments) => [comment, ...comments]);
    addComment(comment, props.storyId);
  };

  return (
    <>
      <CommentsCountLabel>{comments.length} Comments</CommentsCountLabel>
      <CommentForm addComment={commentAddHandler} setError={setError} setNotificationTitle={setNotificationTitle} />
      {!isLoading && <StoryCommentsList comments={comments} />}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default StoryCommentsContent;
