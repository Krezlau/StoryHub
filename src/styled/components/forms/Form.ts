import styled from "styled-components";

export const FormContent = styled.div`
  margin: 1rem auto;
  text-align: center;

  label {
    font-weight: bold;
    margin-bottom: .5rem;
    margin-top: 2rem;
    display: block;
  }

  input {
    font: inherit;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    width: 50%;
  }

  textarea {
    resize: none;
    width: 50%;
    height: 20rem;
  }

  select {
       padding: .5rem;
       border-style: none;
       border-radius: 14px;
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
`

export const FormErrorText = styled.p`
  color: #b40e0e;
`