import React, {Fragment, useEffect} from "react";
import { IUser } from "../../pages/ProfilePage";
import Button from "../UI/Button";
import StoryList from "../stories/StoryList";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  UserContent,
  UserInfo,
  UserInfoLabels,
  UserProfileActions
} from "../../styled/components/user-profiles/ProfileContent";

const ProfileContent: React.FC<{
  user: IUser;
  showAllContent: boolean;
}> = (props) => {
  const {isLoading, fetchStories} = useHttp();

  useEffect(() => {
    fetchStories();
  }, [fetchStories])

  const userStories = useSelector((state: IRootState) =>
    state.stories.stories.filter((story) => story.author === props.user.name)
  );

  return (
    <Fragment>
      <UserContent>
        <UserInfo>
          <UserInfoLabels>
            <p>Username:</p>
            <p>Email:</p>
            <p>Joined:</p>
          </UserInfoLabels>
          <div>
            <p>{props.user.name}</p>
            <p>{props.user.email}</p>
            <p>{props.user.created}</p>
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
