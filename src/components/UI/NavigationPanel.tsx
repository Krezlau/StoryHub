import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { authActions } from "../../store/auth-slice";
import { redirectActions } from "../../store/redirect-slice";
import { Button } from "../../styled/components/UI/UIElements";
import {
  Header,
  NavigationContainer,
  NavigationLink,
  Title,
} from "../../styled/components/UI/NavigationPanel";

const NavigationPanel: React.FC = () => {
  const userId = useSelector((state: IRootState) => state.auth.userId);
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(redirectActions.disable());
    navigate("/login");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <Header>
      <Title>
        <Link to="/home">
          <h1>StoryHub</h1>
        </Link>
      </Title>
      <NavigationContainer>
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
      </NavigationContainer>
      {!isLoggedIn && <Button onClick={loginHandler}>Login</Button>}
      {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
    </Header>
  );
};

export default NavigationPanel;
