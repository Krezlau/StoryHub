import styled from "styled-components";

export const StoryContainer = styled.li`
  border-radius: 10px;
  border-style: none;
  background: ${props => props.theme.storyCardBgColor};
  color: ${props => props.theme.storyCardTextColor};
  padding: 1rem;
  margin: 1rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  a {
    text-decoration: none;
    text-align: right;
    align-self: flex-end;
    color: ${props => props.theme.storyCardLinkColor};
    font-size: ${props => props.theme.headerFontSize};
  }
  
  a:hover {
    color: ${props => props.theme.storyCardLinkHoverColor};
  }
`

export const StoryInfo = styled.div`
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

export const StoryActions = styled.div<{allowDeletion?: boolean}>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid ${props => props.theme.storyCardTextColor};
  padding: 1rem 0 0 0;
  margin: 0;
  
  a {
    grid-column: 2;
  }
  
  button {
    grid-column: 1;
    width: 7rem;
    font-size: ${props => props.theme.mainContentFontSize};
    max-width: 15rem;
    padding: 0.25rem 1rem;
    border-radius: ${props => props.theme.standardBorderRadius};
    border-style: none;
    background: ${props => props.theme.buttonColor};
    color: ${props => props.theme.textColor};
  }

  button:active,
  button:hover {
    background: ${props => props.theme.buttonHoverColor};
  }
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr ${props => props.allowDeletion ? '1fr' : ''};
    gap: 0.5rem;
    
    a {
      grid-row: ${props => props.allowDeletion ? '2' : '1'};
      grid-column: unset;
      text-align: center;
    }
    
    button {
      grid-column: unset;
      width: 100%;
      grid-row: 1;
    }
  }
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

export const StoryTags = styled.ul`
  display: flex;
  justify-content: left;
  padding: 0;
  flex-wrap: wrap;

  p {
    margin-right: .5rem;
  }
`