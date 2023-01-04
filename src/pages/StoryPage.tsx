import React, { Fragment } from "react";
import PageHeader from "../components/UI/PageHeader";
import StoryDetails from "../components/stories/StoryDetails";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import {IRootState} from "../store";

const StoryPage: React.FC = () => {
  const { storyId } = useParams<{storyId?: string}>();

  let storyIdNum: number;

  if (!!storyId) {
    storyIdNum = +storyId;
  }

  const story = useSelector((state: IRootState) => state.stories.stories.find(s => s.id === storyIdNum));



  return (
    <Fragment>
      <PageHeader title={story ? story.title : "404"} />
      <StoryDetails story={story}/>
    </Fragment>
  );
};

export default StoryPage;