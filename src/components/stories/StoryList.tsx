import React, { useState } from "react";
import Story from "./Story";
import { Stories } from "../../styled/components/stories/StoryList";
import FilterSortStories from "./FilterSortStories";
import {IStory} from "../../pages/AllStoriesPage";

const StoryList: React.FC<{ stories: IStory[] }> = (props) => {
  const [sortNewest, toggleSortNewest] = useState<boolean>(false);

  if (props.stories.length === 0) {
    return (
      <div>
        <h3>No stories found.</h3>
      </div>
    );
  }

  const toggleSortBy = () => {
    toggleSortNewest((state) => !state);
  };

  return (
    <>
      <FilterSortStories sortByNewest={sortNewest} toggleSortBy={toggleSortBy}  />
      <Stories>
        {props.stories
          .sort((a, b) => {
            if (a.createdAt.getTime() > b.createdAt.getTime())
              return sortNewest ? 1 : -1;
            if (a.createdAt.getTime() === b.createdAt.getTime()) return 0;
            return sortNewest ? -1 : 1;
          })
          .map((story) => (
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
    </>
  );
};

export default StoryList;
