import styled from "styled-components";

export const Button = styled.button`
  font-size: ${props => props.theme.mainContentFontSize};
  margin: 1rem auto;
  width: 100%;
  max-width: 15rem;
  padding: 0 1.5rem;
  height: 3rem;
  border-radius: ${props => props.theme.standardBorderRadius};
  border-style: none;
  background: ${props => props.theme.buttonColor};
  color: ${props => props.theme.textColor};

  &:active,
  &:hover {
    background: ${props => props.theme.buttonHoverColor};
  }
`

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid;
    border-color: ${props => props.theme.buttonColor} transparent ${props => props.theme.buttonColor} transparent;
    animation: spinner 1.2s linear infinite;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`