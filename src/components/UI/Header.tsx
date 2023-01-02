import React from "react";
import { Link, NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { IRootState } from "../../store";

const Header: React.FC = () => {
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
  
  return (
    <div className='header'>
      <NavLink to="home">
        <h1>StoriesHub</h1>
      </NavLink>
      {!isLoggedIn && (
        <Link to="/login">
          <h3>Login</h3>
        </Link>
      )}
    </div>
  );
};

export default Header;