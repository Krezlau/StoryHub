import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import Story from "./Story";
import classes from "./StoryList.module.css";

const StoryList: React.FC = () => {
  const stories = useSelector((state: IRootState) => state.stories.stories);

  return (
    <div className={classes.list}>
      <ul>
        {stories.map((story) => (
          <Story title={story.title} author={story.author} key={story.id} />
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
