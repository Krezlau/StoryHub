import React, { Fragment } from "react";
import PageHeader from "../components/UI/PageHeader";
import ProfileContent from "../components/user-profiles/ProfileContent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

export interface IUser {
  name: string;
  email: string;
  created: string;
}

const ProfilePage: React.FC = () => {
  const { userId: username } = useParams<{ userId?: string }>();
  const loggedUserData = useSelector((state: IRootState) => state.auth);

  let showAllContent = false;
  if (username === loggedUserData.userName) {
    showAllContent = true;
  }

  let user: IUser;
  if (showAllContent) {
    user = {
      name: loggedUserData.userName,
      email: loggedUserData.email,
      created: loggedUserData.created,
    };
  } else {
    // fetch
    user = {
      name: "temp",
      email: "temp@temp.temp",
      created: "tempdate",
    };
  }

  return (
    <Fragment>
      <PageHeader title={showAllContent ? "My Profile" : "User Profile"} />
      <ProfileContent user={user} showAllContent={showAllContent} />
    </Fragment>
  );
};

export default ProfilePage;
