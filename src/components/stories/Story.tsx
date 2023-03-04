import React from "react";
import { Link } from "react-router-dom";
import StoryTag from "./StoryTag";
import {
  StoryActions,
  StoryAuthor,
  StoryContainer,
  StoryInfo,
  StoryTags,
} from "../../styled/components/stories/Story";

const Story: React.FC<{
  title: string;
  author: string;
  id: string;
  userId: string;
  tags: string[];
  onDelete?: (storyId: string) => void;
}> = (props) => {

  const deleteHandler = () => {
    if (!!props.onDelete) props.onDelete(props.id);
  }

  return (
    <StoryContainer>
      <StoryInfo>
        <h2>{props.title}</h2>
        <StoryAuthor>
          by <Link to={`/profile/${props.userId}`}>{props.author}</Link>
        </StoryAuthor>
        <StoryTags>
          {props.tags.map((t) => (
            <StoryTag key={t} displayOnly={true} tag={t} onDelete={() => {}} />
          ))}
        </StoryTags>
      </StoryInfo>
      <StoryActions allowDeletion={!!props.onDelete}>
        {!!props.onDelete && <button onClick={deleteHandler}>Delete</button>}
        <Link to={`/stories/${props.id}`}>Read...</Link>
      </StoryActions>
    </StoryContainer>
  );
};

export default Story;
