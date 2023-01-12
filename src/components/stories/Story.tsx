import React from "react";
import classes from "./Story.module.css";
import { Link } from "react-router-dom";
import StoryTag from "./StoryTag";

const Story: React.FC<{
  title: string;
  author: string;
  id: string;
  userId: string;
  tags: string[];
}> = (props) => {
  return (
    <li>
      <div className={classes.story}>
        <div className={classes["story-info"]}>
          <h2>{props.title}</h2>
          <div className={classes.author}>
            by <Link to={`/profile/${props.userId}`}>{props.author}</Link>
          </div>
          <div className={classes.tags}>
            <p>Tags:</p>
            <ul>
              {props.tags.map((t) => (
                <StoryTag
                  key={t}
                  displayOnly={true}
                  tag={t}
                  onDelete={() => {}}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className={classes["story-actions"]}>
          <Link to={`/stories/${props.id}`}>Read...</Link>
        </div>
      </div>
    </li>
  );
};

export default Story;
