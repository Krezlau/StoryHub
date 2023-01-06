import React, { FormEvent, useRef } from "react";
import classes from "./Form.module.css";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { IStory } from "../../store/stories-slice";
import { IRootState } from "../../store";
import { useNavigate } from "react-router-dom";
import {addStory, useStoriesDispatch} from "../../store/stories-actions";

const NewStoryForm: React.FC = () => {
  const userData = useSelector((state: IRootState) => state.auth);
  const dispatch = useStoriesDispatch();
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const title = titleRef.current!.value;
    const text = textRef.current!.value;

    // validate

    const story: IStory = {
      title: title,
      text: text,
      author: userData.userName,
      userId: userData.userId,
      id: "",
    };
    dispatch(addStory(story));
    navigate("/stories");
  };

  return (
    <div className={classes.content}>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Title</label>
        <input type="text" ref={titleRef} />
        <label htmlFor="content">Text</label>
        <textarea ref={textRef} />
        <div className={classes.actions}>
          <Button type={"submit"}>Add</Button>
        </div>
      </form>
    </div>
  );
};

export default NewStoryForm;
