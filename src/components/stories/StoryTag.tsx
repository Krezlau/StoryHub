import classes from './StoryTag.module.css'
import React from "react";

const StoryTag: React.FC<{ displayOnly?: boolean, tag: string, onDelete: (tag: string) => void }> = (props) => {

  const buttonClickHandler = () => {
    props.onDelete(props.tag);
  }

  return <li className={classes.tag}>
    <p>{props.tag}</p>
    {!props.displayOnly && <button type={"button"} onClick={buttonClickHandler}>x</button>}
  </li>
}

export default StoryTag;
