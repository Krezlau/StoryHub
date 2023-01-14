import styled from "styled-components";
import {mediaQuery} from "../../Global";

export const Stories = styled.ul`
  list-style: none;
  padding-left: 0;
  
  @media screen and (min-width: ${mediaQuery}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`