import styled from "styled-components";

export const StoryContainer = styled.li`
  border-radius: 10px;
  border-style: none;
  background: whitesmoke;
  color: black;
  padding: 2rem 2rem 1rem;
  margin: 1rem;
  text-align: left;
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    text-align: right;
    align-self: flex-end;
    color: #0f5b5b;
    font-size: 1.25rem;
  }
`

export const StoryInfo = styled.div`
  padding-right: 1rem;
  width: 100%;

  h2 {
    padding: 0;
    margin: 0;
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }
`

export const StoryActions = styled.div`
  border-left-style: solid;
  border-left-width: 1px;
  padding: 1rem 1rem 0;
  margin: 0 0 1rem;
  display: flex;
`

export const StoryAuthor = styled.div`
  text-align: left;
  font-style: italic;
  margin-top: .5rem;
  margin-bottom: 1rem;

  a {
    font-size: .9rem;
  }
`

export const StoryTags = styled.div`
  display: flex;
  justify-content: left;

  p {
    margin-right: .5rem;
  }

  ul {
    display: flex;
    justify-content: left;
  }
`