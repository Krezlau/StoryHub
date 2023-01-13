import React from "react";
import { Link } from "react-router-dom";
import StoryTag from "./StoryTag";
import {StoryActions, StoryAuthor, StoryContainer, StoryInfo, StoryTags} from "../../styled/components/stories/Story";

const Story: React.FC<{
  title: string;
  author: string;
  id: string;
  userId: string;
  tags: string[];
}> = (props) => {
  return (
    <StoryContainer>
      <StoryInfo>
        <h2>{props.title}</h2>
        <StoryAuthor>
          by <Link to={`/profile/${props.userId}`}>{props.author}</Link>
        </StoryAuthor>
        <StoryTags>
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
        </StoryTags>
      </StoryInfo>
      <StoryActions>
        <Link to={`/stories/${props.id}`}>Read...</Link>
      </StoryActions>
    </StoryContainer>
  );
};

export default Story;
