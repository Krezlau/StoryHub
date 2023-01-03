import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { authActions } from "../../store/auth-slice";
import classes from "./Header.module.css";
import Button from "./Button";

const Header: React.FC = () => {
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
    <div className={classes.header}>
      <div className={classes["header-content"]}>
        <NavLink to="home">
          <h1>StoriesHub</h1>
        </NavLink>
        {!isLoggedIn && <Button onClick={loginHandler}>Login</Button>}
        {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
      </div>
    </div>
  );
};

export default Header;