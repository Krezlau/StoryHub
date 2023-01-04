import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStory {
  id: number;
  title: string;
  author: string;
  userId: string;
  text: string;
}

interface IStoriesState {
  stories: IStory[];
}

const initialState: IStoriesState = {
  stories: [
    {
      id: 0,
      title: "My Story",
      author: "Krezlau",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      userId: "jsakflja",
    },
    {
      id: 1,
      title: "My Story vol 2",
      author: "Krezlau",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      userId: "jsakflja",
    },
  ],
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
      action: PayloadAction<{ id: number }>
    ) => {
      state.stories = state.stories.filter(
        (story) => story.id !== action.payload.id
      );
    },
  },
});

export const storiesActions = storiesSlice.actions;

export default storiesSlice;
