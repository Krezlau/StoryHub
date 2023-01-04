import { Link, NavLink, useNavigate } from "react-router-dom";
import React from "react";
import classes from "./NavigationPanel.module.css";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { authActions } from "../../store/auth-slice";

const NavigationPanel: React.FC = () => {
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());

    navigate("/login");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <div className={classes.nav}>
      <div className={classes.header}>
        <Link to="/home">
          <h1>StoryHub</h1>
        </Link>
      </div>
      <div className={classes.content}>
        <ul>
          <li>
            <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to={"stories"}>Stories</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to={"new-story"}>Add new story</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to={"profile"}>Profile</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? classes.active : '')} to={"about"}>About</NavLink>
          </li>
        </ul>
      </div>
      <div className={classes.bottom}>
        {!isLoggedIn && <Button onClick={loginHandler}>Login</Button>}
        {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
      </div>
    </div>
  );
};

export default NavigationPanel;
