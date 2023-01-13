import React from "react";
import Story from "./Story";
import { IStory } from "../../store/stories-slice";
import {Stories} from "../../styled/components/stories/StoryList";

const StoryList: React.FC<{ stories: IStory[] }> = (props) => {
  if (props.stories.length === 0) {
    return (
      <div>
        <h3>No stories found.</h3>
      </div>
    );
  }

  return (
      <Stories>
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
      </Stories>
  );
};

export default StoryList;
