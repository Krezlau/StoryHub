import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
  background: aqua;
  padding: 1rem;
  margin: 0;
  height: 3rem;

  a {
    color: #0b4545;
  }

  a:hover {
    color: #0dc2c2;
  }

  a:active,
  a.active {
    color: #0dc2c2;
    border-bottom-style: solid;
    border-bottom-width: 2px;
  }

  button {
    margin: 0 2rem 0 0;
  }
`;

export const Title = styled.div`
  padding: 0;
  margin: 0;

  h1 {
    margin-right: 1rem;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }
`;

export const NavigationContainer = styled.ul`
  width: 100%;
  max-width: 70rem;
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  margin: 0;
  padding: 0;
  
  li {
    margin-top: 0.75rem;
    margin-bottom: auto;
    font-size: 1.25rem;
  }
`;

export const NavigationLink = styled(NavLink)`
  &.active {
    color: #0dc2c2;
    border-bottom-style: solid;
    border-bottom-width: 2px;
  }
`;