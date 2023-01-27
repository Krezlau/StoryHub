import styled from "styled-components";

export const CommentFormContent  = styled.div`
  width: 100%;
  
  textarea {
    color: ${props => props.theme.textColor};
    width: 100%;
    border: none;
    background: none;
    border-bottom: 2px solid grey;
    resize: none;
  }
  
  textarea:focus,
  textarea:active,
  textarea.active{
    outline: none;
    border: none;
    border-bottom: 2px solid ${props => props.theme.textColor};
  }
  
  label {
    display: block;
    width: 100%;
    text-align: left;
  }
`;

export const CommentFormActions = styled.div`
  display: flex;
  justify-content: right;
  gap: 1rem;
  
  button {
    color: ${props => props.theme.textColor};
    background: ${(props) => props.theme.buttonColor};
    border: none;
    border-radius: ${props => props.theme.standardBorderRadius};
    padding: .3rem 1rem;
    margin-top: .5rem;
  }
  
  button:hover {
    background: ${props => props.theme.buttonHoverColor};
  }
`
