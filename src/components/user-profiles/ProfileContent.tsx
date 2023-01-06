import React, {Fragment, useEffect} from "react";
import { IUser } from "../../pages/ProfilePage";
import classes from "./ProfileContent.module.css";
import Button from "../UI/Button";
import StoryList from "../stories/StoryList";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import {fetchAllStories, useStoriesDispatch} from "../../store/stories-actions";

const ProfileContent: React.FC<{
  user: IUser;
  showAllContent: boolean;
}> = (props) => {
  // maybe make hook out of this?
  const dispatch = useStoriesDispatch();

  useEffect(() => {
    dispatch(fetchAllStories());
  }, [dispatch])

  const userStories = useSelector((state: IRootState) =>
    state.stories.stories.filter((story) => story.author === props.user.name)
  );

  return (
    <Fragment>
      <div className={classes.content}>
        <div className={classes.info}>
          <div className={classes["info-labels"]}>
            <p>Username:</p>
            <p>Email:</p>
            <p>Joined:</p>
          </div>
          <div>
            <p>{props.user.name}</p>
            <p>{props.user.email}</p>
            <p>{props.user.created}</p>
          </div>
        </div>
        {props.showAllContent && (
          <div className={classes.actions}>
            <Button>Change Password</Button>
          </div>
        )}
      </div>
      <div>
        <h1>User Stories</h1>
        <StoryList stories={userStories} />
      </div>
    </Fragment>
  );
};

export default ProfileContent;
