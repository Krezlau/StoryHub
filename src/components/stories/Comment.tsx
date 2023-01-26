import React from "react";
import { IComment } from "./StoryCommentsList";
import {CommentContent} from "../../styled/components/stories/Comments";
import {Link} from "react-router-dom";

const Comment: React.FC<{ comment: IComment }> = (props) => {
  return <CommentContent>
    <h5><Link to={`/profile/${props.comment.authorId}`}>{props.comment.authorName}</Link>  {props.comment.createdAt}</h5>
    <p>{props.comment.text}</p>
  </CommentContent>;
};

export default Comment;
