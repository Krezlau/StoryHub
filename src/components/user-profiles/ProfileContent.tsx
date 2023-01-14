import React, { Fragment, useEffect } from "react";
import { IUser } from "../../pages/ProfilePage";
import StoryList from "../stories/StoryList";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import useHttp from "../../hooks/useHttp";
import {
  UserContent,
  UserInfo,
  UserProfileActions,
} from "../../styled/components/user-profiles/ProfileContent";
import {Button, LoadingSpinner} from "../../styled/components/UI/UIElements";

const ProfileContent: React.FC<{
  user: IUser;
  showAllContent: boolean;
}> = (props) => {
  const { isLoading, fetchStories } = useHttp();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const userStories = useSelector((state: IRootState) =>
    state.stories.stories.filter((story) => story.author === props.user.name)
  );

  return (
    <Fragment>
      <UserContent>
        <UserInfo>
          <div>
            <p>Username:</p>
            <h3>{props.user.name}</h3>
            <p>Email:</p>
            <h3>{props.user.email}</h3>
            <p>Joined:</p>
            <h3>{props.user.created}</h3>
          </div>
        </UserInfo>
        {props.showAllContent && (
          <UserProfileActions>
            <Button>Change Password</Button>
          </UserProfileActions>
        )}
      </UserContent>
      <div>
        <h1>User Stories</h1>
        {!isLoading && <StoryList stories={userStories} />}
        {isLoading && <LoadingSpinner />}
      </div>
    </Fragment>
  );
};

export default ProfileContent;
