import React, {Fragment, useCallback, useEffect, useState} from "react";
import PageHeader from "../components/UI/PageHeader";
import ProfileContent from "../components/user-profiles/ProfileContent";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {IRootState} from "../store";
import axios from "axios";

export interface IUser {
  name: string;
  email: string;
  created: string;
}

const ProfilePage: React.FC = () => {
  const {userId: id} = useParams<{ userId?: string }>();
  const loggedUserData = useSelector((state: IRootState) => state.auth);

  const [user, setUser] = useState<IUser>({name: "", created: "", email: ""});

  let showAllContent = false;

  const fetchUser = useCallback(async () => {
    try{
      const response = await axios.get(`https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
      if (response.status > 299) {
        // handle
        return;
      }
      const data = response.data;
      const user: IUser = {name: data.name, email: data.email, created: data.created}

      setUser(user);
    } catch (e) {
      //handle
      console.log(e);
    }
  }, [id])

  useEffect(() => {
    fetchUser().then(r => {});
  }, [fetchUser])

  if (id === loggedUserData.userId){
    showAllContent = true;
  }

  return (
    <Fragment>
      <PageHeader title={showAllContent ? "My Profile" : "User Profile"}/>
      <ProfileContent user={user} showAllContent={showAllContent}/>
    </Fragment>
  );
};

export default ProfilePage;
