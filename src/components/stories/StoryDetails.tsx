import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  StoryDetailsActions,
  StoryDetailsActivityInfo,
  StoryDetailsAuthor,
  StoryDetailsContent,
  StoryDetailsFooter
} from "../../styled/components/stories/StoryDetails";
import {IStory} from "../../pages/AllStoriesPage";

const StoryDetails: React.FC<{ story?: IStory }> = (props) => {
  if (!props.story) {
    return <p>Couldn't find the story you are looking for.</p>;
  }

  return (
    <Fragment>
      <StoryDetailsAuthor>
        <h5>
          by{" "}
          <Link to={`/profile/${props.story.userId}`}>
            {props.story.author}
          </Link>
        </h5>
      </StoryDetailsAuthor>
      <StoryDetailsContent>
        {props.story.text.split("\n").map(t => <p>{t}</p>)}
      </StoryDetailsContent>
      <StoryDetailsFooter>
        <StoryDetailsActivityInfo>
          <p>2137 views</p>
          <p>11 likes</p>
        </StoryDetailsActivityInfo>
        <StoryDetailsActions>
          <button>Like</button>
          <button>Add to favourites</button>
        </StoryDetailsActions>
      </StoryDetailsFooter>
    </Fragment>
  );
};

export default StoryDetails;
