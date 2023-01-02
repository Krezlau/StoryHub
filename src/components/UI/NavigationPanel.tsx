import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { authActions } from "../../store/auth-slice";
import React from "react";
import {IRootState} from "../../store";

const NavigationPanel: React.FC = () => {
  const isLoggedIn = useSelector((state:IRootState ) => state.auth.isLoggedIn)
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(authActions.login({ email: "username", password: "password" }));
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <ul>
      <li>
        <NavLink to={"stories"}>Stories</NavLink>
      </li>
      <li>
        <NavLink to={"profile"}>Profile</NavLink>
      </li>
      {!isLoggedIn && <button onClick={loginHandler}>LOGIN</button>}
      {isLoggedIn && <button onClick={logoutHandler}>LOGOUT</button>}
    </ul>
  );
};

export default NavigationPanel;