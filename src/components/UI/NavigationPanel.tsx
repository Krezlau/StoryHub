import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { authActions } from "../../store/auth-slice";
import { redirectActions } from "../../store/redirect-slice";
import {
  Header,
  NavigationList,
  NavigationLink,
  NavToggle,
  Title,
  NavigationContainer,
} from "../../styled/components/UI/NavigationPanel";

const NavigationPanel: React.FC = () => {
  const userId = useSelector((state: IRootState) => state.auth.userId);
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
  const location = useLocation();
  const [isOpen, toggleIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    toggleIsOpen(false);
  }, [location]);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(redirectActions.disable());
    navigate("/login");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const toggleHandler = () => {
    toggleIsOpen((state) => !state);
  };

  return (
    <Header>
      <Title to="/home">
        <h1>StoryHub</h1>
      </Title>
      <NavToggle onClick={toggleHandler}>
        <span></span>
      </NavToggle>
      <NavigationContainer isOpen={isOpen}>
        <NavigationList>
          <li>
            <NavigationLink to={"stories"}>Stories</NavigationLink>
          </li>
          <li>
            <NavigationLink to={"new-story"}>Add new story</NavigationLink>
          </li>
          <li>
            <NavigationLink to={`profile/${userId}`}>Profile</NavigationLink>
          </li>
          <li>
            <NavigationLink to={"about"}>About</NavigationLink>
          </li>
          <li>
            {!isLoggedIn && <button onClick={loginHandler}>Login</button>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </NavigationList>
      </NavigationContainer>
    </Header>
  );
};

export default NavigationPanel;
