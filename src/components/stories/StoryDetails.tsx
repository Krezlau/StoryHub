import React, {Fragment, useState} from "react";
import { Link } from "react-router-dom";
import {
  StoryDetailsActions,
  StoryDetailsAuthor,
  StoryDetailsContent,
  StoryDetailsFooter,
} from "../../styled/components/stories/StoryDetails";
import { IStory } from "../../pages/AllStoriesPage";
import useHttp from "../../hooks/useHttp";

const StoryDetails: React.FC<{ story?: IStory, onLike: (newLikesCount: number) => void}> = (props) => {
  const [isLiked, toggleIsLiked] = useState<boolean>(props.story ? props.story.isLikedByUser : false);
  const {likeStory, unLikeStory} = useHttp();

  if (!props.story) {
    return <p>Couldn't find the story you are looking for.</p>;
  }

  const likeHandler = () => {
    if (isLiked) {
      unLikeStory(props.story!.id);
      props.onLike(props.story!.likesCount - 1);
      toggleIsLiked(false);
    } else {
      likeStory(props.story!.id);
      props.onLike(props.story!.likesCount + 1);
      toggleIsLiked(true);
    }
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
        {props.story.text.split("\n").map((t) => (
          <p>{t}</p>
        ))}
      </StoryDetailsContent>
      <StoryDetailsFooter>
        <StoryDetailsActions>
          <p>{props.story.likesCount} likes</p>
          <button onClick={likeHandler}>Like</button>
        </StoryDetailsActions>
      </StoryDetailsFooter>
    </Fragment>
  );
};

export default StoryDetails;
