import styled from "styled-components";

export const StoryDetailsContent = styled.div`
  font-size: 1.3rem;
  text-align: justify;
`

export const StoryDetailsAuthor = styled.div`
  text-align: left;
  font-style: italic;
`

export const StoryDetailsFooter = styled.div`
  border-top-style: solid;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.1rem;

  p {
    margin-right: 1rem;
    display: inline;
  }
`

export const StoryDetailsActivityInfo = styled.div`
  padding: .5rem 0;
`

export const StoryDetailsActions = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin-left: 1rem;
    border-style: none;
    border-radius: 10px;
    padding: .5rem 1rem;
    background: #0b4545;
    color: #e6fcfc;
  }

  button:active,
  button:hover{
    background: #126e6e;
  }
`