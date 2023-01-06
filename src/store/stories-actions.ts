import { AppDispatch } from "./index";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { IStory, storiesActions } from "./stories-slice";

export const fetchAllStories = () => {
  return async (dispatch: Dispatch<AnyAction>) => {};
};

export const addStory = (story: IStory) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendStoryToDB = async () => {
      const response = await fetch(
        "https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories.json",
        {
          method: "POST",
          body: JSON.stringify(story),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch.");
      }

      return await response.json();
    };

    try {
      const postData = await sendStoryToDB();
      story.id = postData.name;
      dispatch(storiesActions.addNewStory({ story }));
    } catch (e) {
      // handle
      console.log(e);
    }
  };
};

export const useStoriesDispatch: () => AppDispatch = useDispatch;
