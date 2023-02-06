import styled from "styled-components";

export const FilterSortPanel = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 1rem;
  
  button {
    background: none;
    border: none;
    color: ${props => props.theme.textColor};
    font-size: ${(props) => props.theme.mainContentFontSize};
  }
  
  button:hover {
    color: ${props => props.theme.buttonHoverColor}
  }
`;
