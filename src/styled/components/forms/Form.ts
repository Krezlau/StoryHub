import styled from "styled-components";

export const FormContent = styled.div`
  margin: auto;
  width: 100%;
  text-align: center;

  label {
    font-weight: bold;
    margin-bottom: .5rem;
    margin-top: 1rem;
    display: block;
  }

  input {
    font: inherit;
    padding: 0.5rem;
    margin: 0;
    border-radius: ${props => props.theme.standardBorderRadius};
    border: 1px solid #ccc;
    width: calc(100% - 1rem - 2px);
    max-width: 25rem;
  }

  textarea {
    font: inherit;
    resize: none;
    padding: 0.5rem;
    margin: 0;
    width: calc(100% - 6px);
    max-width: 25rem;
    height: 20rem;
    border-radius: ${props => props.theme.standardBorderRadius};
  }

  select {
    padding: .5rem;
    border-style: none;
    border-radius: ${props => props.theme.standardBorderRadius};
    width: calc(100% - 1rem - 2px);
    max-width: 25rem;
  }
`

export const FormActions = styled.div`
  margin-top: 1rem;
  text-align: center;
`

export const FormTags = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

export const FormErrorText = styled.p`
  color: #b40e0e;
`