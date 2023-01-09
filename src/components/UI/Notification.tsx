import React, { Fragment, useState } from "react";
import classes from "./Notification.module.css";
import ReactDOM from "react-dom";

const NotificationComponent: React.FC<{title: string, message: string}> = (props) => {
  const [isShown, toggleIsShown] = useState<boolean>(true);

  return (
    <div
      className={isShown ? classes.content : classes.disabled}
      onClick={() => toggleIsShown(false)}
    >
      <div className={classes.title}>
        <h2>{props.title}</h2>
      </div>
      <div className={classes.message}>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

const Notification: React.FC<{title: string, message: string}> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <NotificationComponent title={props.title} message={props.message}/>,
        document.getElementById("notification")!
      )}
    </Fragment>
  );
};

export default Notification;
