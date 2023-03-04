import React from "react";
import {Tag} from "../../styled/components/stories/StoryTag";

const StoryTag: React.FC<{ displayOnly?: boolean, tag: string, onDelete: (tag: string) => void }> = (props) => {

  const buttonClickHandler = () => {
    props.onDelete(props.tag);
  }

  return <Tag>
    <p>{props.tag}</p>
    {!props.displayOnly && <button type={"button"} onClick={buttonClickHandler}>x</button>}
  </Tag>
}

export default StoryTag;
