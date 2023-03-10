import React, { Fragment, useEffect, useState } from "react";
import PageHeader from "../components/UI/PageHeader";
import ProfileContent from "../components/user-profiles/ProfileContent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import useHttp from "../hooks/useHttp";
import {LoadingSpinner} from "../styled/components/UI/UIElements";

export interface IUser {
  name: string;
  email: string;
  created: string;
}

const ProfilePage: React.FC = () => {
  const { userId: id } = useParams<{ userId?: string }>();
  const loggedUserData = useSelector((state: IRootState) => state.auth);
  const { isLoading, fetchUser } = useHttp();
  const [user, setUser] = useState<IUser>({ name: "", created: "", email: "" });

  let showAllContent = false;

  useEffect(() => {
    const fetch = async () => {
      if (id != null) {
        const user = await fetchUser(id);
        if (user) {
          setUser(user);
        }
      }
    };

    fetch();
  }, [fetchUser, id]);


  if (id === loggedUserData.userId) {
    showAllContent = true;
  }

  return (
    <Fragment>
      <PageHeader title={showAllContent ? "My Profile" : "User Profile"} />
      {!isLoading && (
        <ProfileContent user={user} showAllContent={showAllContent} userId={id ? id : ""} />
      )}
      {isLoading && <LoadingSpinner />}
    </Fragment>
  );
};

export default ProfilePage;
