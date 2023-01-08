import { AppDispatch } from "./index";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { IStory, storiesActions } from "./stories-slice";
import axios from "axios";

export const fetchAllStories = (
  setIsLoading: (newState: boolean) => void,
  setError: (newState: string) => void
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    setIsLoading(true);
    setError("");

    const fetchStoriesFromDB = async () => {
      const response = await axios.get(
        "https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories.json"
      );

      if (response.status > 299) {
        throw new Error("Could not fetch.");
      }

      return response.data;
    };

    try {
      const storiesData = await fetchStoriesFromDB();
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
      setIsLoading(false);
      setError("");
    } catch (e) {
      console.log(e);
      setError("Could not fetch stories.");
      setIsLoading(false);
    }
  };
};

export const addStory = (
  story: IStory,
  setIsLoading: (newState: boolean) => void,
  setError: (newState: string) => void
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    setIsLoading(true);
    setError("");

    const sendStoryToDB = async () => {
      const response = await axios.post(
        "https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/stories.json",
        story,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status > 299) {
        throw new Error("Could not send data.");
      }

      return response.data.name;
    };

    try {
      story.id = await sendStoryToDB();
      dispatch(storiesActions.addNewStory({ story }));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError("Could not send data.")
      setIsLoading(false);
    }
  };
};

export const useStoriesDispatch: () => AppDispatch = useDispatch;
