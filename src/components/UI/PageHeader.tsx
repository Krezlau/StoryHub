import React from "react";
import classes from "./PageHeader.module.css";

const PageHeader: React.FC<{ title: string }> = (props) => {
  return (
    <div className={classes["page-header"]}>
      <h1>{props.title}</h1>
    </div>
  );
};

export default PageHeader;