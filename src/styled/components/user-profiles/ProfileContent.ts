import styled from "styled-components";
import {mediaQuery} from "../../Global";

export const UserContent = styled.div`
  border-bottom-style: solid;
  padding-bottom: 2rem;
  
  @media screen and (min-width: ${mediaQuery}) {
    display: flex;
    justify-content: space-evenly;
  }
`

export const UserInfo = styled.div`
  font-size: 1.2rem;
  word-wrap: break-word;
`

export const UserProfileActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`