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
          by{" "}
          <Link to={`/profile/${props.story.userId}`}>
            {props.story.author}
          </Link>
        </h5>
      </div>
      <div className={classes.content}>
        <p>{props.story.text}</p>
      </div>
      <div className={classes.footer}>
        <div className={classes.info}>
          <text>2137 views</text>
          <text>11 likes</text>
          <text>2 comments</text>
        </div>
        <div className={classes.actions}>
          <button>Like</button>
          <button>Comment</button>
          <button>Add to favourites</button>
        </div>
      </div>
    </Fragment>
  );
};

export default StoryDetails;
