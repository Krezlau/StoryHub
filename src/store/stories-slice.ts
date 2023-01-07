import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStory {
  id: string;
  title: string;
  author: string;
  userId: string;
  text: string;
  tags: string[];
}

interface IStoriesState {
  stories: IStory[];
}

const initialState: IStoriesState = {
  stories: []
};

const storiesSlice = createSlice({
  name: "stories",
  initialState: initialState,
  reducers: {
    addNewStory: (
      state: IStoriesState,
      action: PayloadAction<{ story: IStory }>
    ) => {
      state.stories = [action.payload.story, ...state.stories];
    },
    removeStory: (
      state: IStoriesState,
      action: PayloadAction<{ id: string }>
    ) => {
      state.stories = state.stories.filter(
        (story) => story.id !== action.payload.id
      );
    },
    replaceStories: (
      state: IStoriesState,
      action: PayloadAction<{ stories: IStory[] }>
    ) => {
      state.stories = action.payload.stories;
    },
  },
});

export const storiesActions = storiesSlice.actions;

export default storiesSlice;
