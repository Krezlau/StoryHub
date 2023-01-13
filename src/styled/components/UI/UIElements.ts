import styled from "styled-components";

export const Button = styled.button`
  font-size: 1.1rem;
  margin: 1rem 0;
  width: 100%;
  max-width: 15rem;
  padding: 0 1.5rem;
  height: 3rem;
  border-radius: 20px;
  border-style: none;
  background: #0b4545;
  color: #e6fcfc;

  &:active,
  &:hover {
    background: #126e6e;
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
    border-color: teal transparent teal transparent;
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