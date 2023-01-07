import React from "react";
import Story from "./Story";
import classes from "./StoryList.module.css";
import { IStory } from "../../store/stories-slice";

const StoryList: React.FC<{ stories: IStory[] }> = (props) => {
  if (props.stories.length === 0) {
    return (
      <div>
        <h3>No stories found.</h3>
      </div>
    );
  }

  return (
    <div className={classes.list}>
      <ul>
        {props.stories.map((story) => (
          <Story
            title={story.title}
            author={story.author}
            userId={story.userId}
            id={story.id}
            key={story.id}
            tags={story.tags}
          />
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
