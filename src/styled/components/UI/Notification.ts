import styled from "styled-components";

export const NotificationContainer = styled.div<{isEnabled: boolean}>`
  position: fixed;
  bottom: 1rem;
  width: 70%;
  left: 50%;
  margin-left: -35%;
  background: ${props => props.theme.headerColor};
  color: ${props => props.theme.titleColor};
  border-radius: ${props => props.theme.standardBorderRadius};
  padding: 0;
  animation: ${(props) => props.isEnabled ? 'content-appear 1s ease-in-out forwards' : 'fade-out 1s ease-out forwards'};
  opacity: ${(props) => props.isEnabled ? '1' : '0' };
  text-align: center;

  @keyframes fade-out {
    from {
      opacity: 1;
      transform: scale(100%);
    }
    to {
      opacity: 0;
      transform: scale(0%);
    }
  }

  @keyframes content-appear {
    from {
      transform: translateY(130%);
    }

    to {
      transform: translateY(0);
    }
  }
`

export const NotificationTitle = styled.div`
  border-bottom-style: solid;
  border-bottom-width: 1px;
  margin: 0;

  h2 {
    margin: .5rem;
  }
`

export const NotificationMessage = styled.div`
  padding: 0.5rem;
`