import {createGlobalStyle} from "styled-components";
import Futura from '../futura.ttf'

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
