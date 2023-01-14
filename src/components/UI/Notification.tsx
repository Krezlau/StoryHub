import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { errorActions } from "../../store/error-slice";
import {
  NotificationContainer,
  NotificationMessage,
  NotificationTitle,
} from "../../styled/components/UI/Notification";

let isInitial = true;

const NotificationComponent: React.FC = () => {
  const data = useSelector((state: IRootState) => state.error);
  const dispatch = useDispatch();

  if (isInitial) {
    isInitial = false;
    return <div></div>;
  }

  return (
    <NotificationContainer
      isEnabled={data.isShown}
      onClick={() => dispatch(errorActions.hide())}
    >
      <NotificationTitle>
        <h2>{data.title}</h2>
      </NotificationTitle>
      <NotificationMessage>
        <p>{data.message}</p>
      </NotificationMessage>
    </NotificationContainer>
  );
};

const Notification: React.FC = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <NotificationComponent />,
        document.getElementById("notification")!
      )}
    </Fragment>
  );
};

export default Notification;
