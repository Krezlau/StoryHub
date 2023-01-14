import styled from "styled-components";

export const Tag = styled.li`
  display: flex;
  justify-content: center;
  border-radius: ${props => props.theme.standardBorderRadius};
  background: ${props => props.theme.headerColor};
  width: auto;
  margin-right: 1rem;
  margin-bottom: 1rem;
  align-self: center;
  color: ${props => props.theme.titleColor};

  p {
    margin: .3rem .5rem;
  }

  button {
    align-self: center;
    padding: .3rem .5rem;
    background: none;
    border-style: none;
    color: #504f4f;
  }
`