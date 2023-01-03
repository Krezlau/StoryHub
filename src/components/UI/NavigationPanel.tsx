import { NavLink } from "react-router-dom";
import React from "react";
import classes from "./NavigationPanel.module.css";

const NavigationPanel: React.FC = () => {
  return (
    <div className={classes.nav}>
      <ul>
        <li>
          <NavLink to={"stories"}>Stories</NavLink>
        </li>
        <li>
          <NavLink to={"profile"}>Profile</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavigationPanel;