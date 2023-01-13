import styled from "styled-components";
import {Link, NavLink} from "react-router-dom";
import {mediaQuery} from "../../Global";


export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: aqua;
  z-index: 999;
  
  a {
    color: black;
  }
  
  @media screen and (min-width: ${mediaQuery}){
    display: grid;
    grid-template-columns: 1fr minmax(600px, 4fr) 1fr;
  }
`;

export const Title = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavigationContainer = styled.nav<{isOpen: boolean}>`
  ${(props) => !props.isOpen ? 'display: none' : 'display: block'}; 
  
  @media screen and (min-width: ${mediaQuery}) {
    display: block;
  }
`

export const NavigationList = styled.ul`
  list-style: none;
  font-size: 1.25rem;
  margin: 0;
  padding: 0;
  
  li {
    margin-left: 1em;
    margin-bottom: 1em;
    text-transform: uppercase;
  }
  
  a, 
  button {
    text-transform: uppercase;
    background: none;
    border: none;
    font-size: 1em;
    padding: 0;
  }

  @media screen and (min-width: ${mediaQuery}) {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    
    li {
      margin: 30px 0;
    }

    button,
    a {
      color: black;
      cursor: pointer;
    }
    button:hover,
    a:hover {
      color: #0dc2c2;
    }
    a:active,
    a.active {
      color: #0dc2c2;
      border-bottom-style: solid;
      border-bottom-width: 2px;
    }
    
  }
  
`;

export const NavigationLink = styled(NavLink)`
`;

export const NavToggle = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 1em;
  height: 82px;
  display: flex;
  align-items: center;
  
  border: none;
  background: none;
  
  span,
  span::before,
  span::after {
    display: block;
    background: white;
    height: 2px;
    width: 2em;
    border-radius: 2px;
    position: relative;
  }

  span::before,
  span::after {
    content: '';
    position: absolute;
  }

  span::before {
    bottom: 7px;
  }

  span::after {
    top: 7px;
  }

  @media screen and (min-width: ${mediaQuery}) {
    display: none;
  }
`;
