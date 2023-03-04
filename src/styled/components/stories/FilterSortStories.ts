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

export const FilterContent = styled.div`
  display: flex;
  gap: 1rem;

  select {
    padding: .5rem;
    border-style: none;
    border-radius: ${props => props.theme.standardBorderRadius};
    width: calc(100% - 1rem - 2px);
    max-width: 25rem;
  }
`
