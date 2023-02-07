import React, {Fragment, useEffect, useState} from "react";
import { IUser } from "../../pages/ProfilePage";
import StoryList from "../stories/StoryList";
import useHttp from "../../hooks/useHttp";
import {
  UserContent,
  UserInfo,
  UserProfileActions,
} from "../../styled/components/user-profiles/ProfileContent";
import {Button, LoadingSpinner} from "../../styled/components/UI/UIElements";
import {useNavigate} from "react-router-dom";
import {IStory} from "../../pages/AllStoriesPage";

const ProfileContent: React.FC<{
  user: IUser;
  showAllContent: boolean;
  userId: string;
}> = (props) => {
  const { isLoading, fetchStories } = useHttp();
  const navigate = useNavigate();
  const [userStories, setUserStories] = useState<IStory[]>([]);

  useEffect(() => {
    fetchStories(setUserStories, props.userId );
  }, [fetchStories, props.userId]);


  const changePasswordHandler = () => {
    navigate('/change-password');
  }

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
            <Button onClick={changePasswordHandler}>Change Password</Button>
          </UserProfileActions>
        )}
      </UserContent>
      <div>
        <h1>User Stories</h1>
        {!isLoading && <StoryList stories={userStories} allowDeletion={props.showAllContent}/>}
        {isLoading && <LoadingSpinner />}
      </div>
    </Fragment>
  );
};

export default ProfileContent;
