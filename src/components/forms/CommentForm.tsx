import {
  CommentFormActions,
  CommentFormContent,
} from "../../styled/components/forms/CommentFormContent";
import React, {ChangeEvent, FormEvent, useState} from "react";
import { IComment } from "../stories/StoryCommentsList";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";

const CommentForm: React.FC<{ addComment: (comment: IComment) => void }> = (
  props
) => {
  const [text, setText] = useState<string>("");
  const auth = useSelector((state: IRootState) => state.auth);

  const textChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }

  const cancelHandler = () => {
    setText("");
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (text.trim().length === 0) {
      // error message
      return;
    }

    const comment: IComment = {
      authorId: auth.userId,
      authorName: auth.userName,
      text: text,
      createdAt: new Date().toDateString(),
      id: "",
    };

    props.addComment(comment);
    setText("");
  };

  return (
    <CommentFormContent>
      <form onSubmit={submitHandler}>
        <textarea placeholder={"Add a comment..."} id="comment" value={text} onChange={textChangeHandler} />
        <CommentFormActions>
          <button type={"button"} onClick={cancelHandler}>Cancel</button>
          <button type={"submit"}>Add</button>
        </CommentFormActions>
      </form>
    </CommentFormContent>
  );
};

export default CommentForm;
