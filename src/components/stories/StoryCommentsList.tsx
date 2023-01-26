import React from "react";
import Comment from "./Comment";
import {CommentList} from "../../styled/components/stories/Comments";

export interface IComment {
  authorId: string;
  authorName: string;
  text: string;
  id: string;
  createdAt: string;
}

const StoryCommentsList: React.FC<{ comments: IComment[] }> = (props) => {
  // fetch from the api

  return <CommentList>
    {props.comments.map(comment => <Comment comment={comment} />)}
  </CommentList>;
};

export default StoryCommentsList;
