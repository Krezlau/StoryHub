import {createGlobalStyle} from "styled-components";
import Futura from '../futura.ttf'

export const mediaQuery = '900px';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Futura;
    src: local(futura), url(${Futura}) format(truetype);
  }

  * {
    font-family: Futura, sans-serif;
    box-sizing: border-box;
  }

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
