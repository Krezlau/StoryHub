import React from "react";
import classes from "./Story.module.css";
import { Link } from "react-router-dom";

const Story: React.FC<{ title: string; author: string, id: number }> = (props) => {
  return (
    <li>
      <div className={classes.story}>
        <div className={classes['story-info']}>
          <h2>{props.title}</h2>
          <p>by {props.author}</p>
        </div>
        <div className={classes['story-actions']}>
          <Link to={`${props.id}`}>Read...</Link>
        </div>
      </div>
    </li>
  );
};

export default Story;
