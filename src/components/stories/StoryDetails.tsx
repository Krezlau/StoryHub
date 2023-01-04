import React, { Fragment } from "react";
import { IStory } from "../../store/stories-slice";
import classes from "./StoryDetails.module.css";
import { Link } from "react-router-dom";

const StoryDetails: React.FC<{ story?: IStory }> = (props) => {
  if (!props.story) {
    return <p>Couldn't find the story you are looking for.</p>;
  }

  return (
    <Fragment>
      <div className={classes.author}>
        <h5>
          by <Link to={`/profile/${props.story.userId}`}>{props.story.author}</Link>
        </h5>
      </div>
      <div className={classes.content}>
        <p>{props.story.text}</p>
      </div>
    </Fragment>
  );
};

export default StoryDetails;
