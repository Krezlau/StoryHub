import {createGlobalStyle} from "styled-components";

export const mediaQuery = '900px';

const GlobalStyles = createGlobalStyle`
  

  body {
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    margin: 0;
    padding: 0;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.linkColor};
  }

  a:hover,
  a:active,
  a.active {
    color: ${props => props.theme.linkColor};
  }
`;

export default GlobalStyles;
