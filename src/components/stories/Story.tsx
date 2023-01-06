import React from "react";
import classes from "./Story.module.css";
import { Link } from "react-router-dom";

const Story: React.FC<{ title: string; author: string, id: string }> = (props) => {
  return (
    <li>
      <div className={classes.story}>
        <div className={classes['story-info']}>
          <h2>{props.title}</h2>
          <div className={classes.author}>
              by <Link to={`/profile/${props.author}`}>{props.author}</Link>
          </div>
        </div>
        <div className={classes['story-actions']}>
          <Link to={`/stories/${props.id}`}>Read...</Link>
        </div>
      </div>
    </li>
  );
};

export default Story;
