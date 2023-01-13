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
  }

  body {
    background-color: #3f3f3f;
    color: #e6fcfc;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: #51f1f1;
  }

  a:hover,
  a:active,
  a.active {
    color: #51f1f1;
  }
`;

export default GlobalStyles;
