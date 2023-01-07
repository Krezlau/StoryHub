import { AppDispatch } from "./index";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { IStory, storiesActions } from "./stories-slice";

export const fetchAllStories = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const fetchStoriesFromDB = async () => {
      const response = await fetch(
        "https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch.");
      }

      return await response.json();
    };

    try {
      const storiesData: IStory[] = await fetchStoriesFromDB();

      const stories: IStory[] = [];
      for (const key in storiesData) {
        stories.push({
          id: key,
          userId: storiesData[key].userId,
          author: storiesData[key].author,
          text: storiesData[key].text,
          title: storiesData[key].title,
          tags: storiesData[key].tags,
        });
      }

      dispatch(storiesActions.replaceStories({ stories }));
    } catch (e) {
      // handle
      console.log(e);
    }
  };
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
