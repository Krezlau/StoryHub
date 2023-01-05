import React from "react";
import Story from "./Story";
import classes from "./StoryList.module.css";
import { IStory } from "../../store/stories-slice";

const StoryList: React.FC<{ stories: IStory[] }> = (props) => {
  return (
    <div className={classes.list}>
      <ul>
        {props.stories.map((story) => (
          <Story
            title={story.title}
            author={story.author}
            id={story.id}
            key={story.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
