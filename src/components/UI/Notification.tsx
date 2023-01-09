import React, { Fragment } from "react";
import classes from "./Notification.module.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { errorActions } from "../../store/error-slice";

let isInitial = true;

const NotificationComponent: React.FC = () => {
  const data = useSelector((state: IRootState) => state.error);
  const dispatch = useDispatch();

  if (isInitial) {
    isInitial = false;
    return <div></div>;
  }

  return (
    <div
      className={data.isShown ? classes.content : classes.disabled}
      onClick={() => dispatch(errorActions.hide())}
    >
      <div className={classes.title}>
        <h2>{data.title}</h2>
      </div>
      <div className={classes.message}>
        <p>{data.message}</p>
      </div>
    </div>
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
