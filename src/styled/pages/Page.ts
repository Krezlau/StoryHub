import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  width: calc(100% - 2rem);
  margin: 84px auto;
  max-width: 70rem;
  text-align: center;
  font-size: ${props => props.theme.mainContentFontSize};
`;
