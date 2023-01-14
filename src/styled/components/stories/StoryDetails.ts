import styled from "styled-components";

export const StoryDetailsContent = styled.div`
  font-size: ${props => props.theme.headerFontSize};
  text-align: justify;
`

export const StoryDetailsAuthor = styled.div`
  text-align: left;
  font-style: italic;
  
  h5 {
    margin: 0;
  }
`

export const StoryDetailsFooter = styled.div`
  border-top-style: solid;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: ${props => props.theme.mainContentFontSize};
`

export const StoryDetailsActivityInfo = styled.div`
  padding: .5rem 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  p {
    margin: 0;
  }
`

export const StoryDetailsActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  
  button {
    border-style: none;
    border-radius: 10px;
    padding: .5rem 1rem;
    background: ${props => props.theme.buttonColor};
    color: ${props => props.theme.textColor};
  }

  button:active,
  button:hover{
    background: ${props => props.theme.buttonHoverColor};
  }
`