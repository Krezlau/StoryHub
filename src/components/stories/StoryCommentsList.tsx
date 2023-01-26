import React from "react";

export interface IComment {
  authorId: string;
  authorName: string;
  text: string;
  id: string;
  createdAt: string;
}

const StoryCommentsList: React.FC<{ storyId: string }> = (props) => {
  // fetch from the api

  const DUMMYCOMMENTS: IComment[] = [
    {
      authorId: "1",
      authorName: "Krezlau",
      text: "That's a really interesting story1.",
      id: "1",
      createdAt: new Date().toDateString(),
    },
    {
      authorId: "1",
      authorName: "Krezlau",
      text: "That's a really interesting story2.",
      id: "2",
      createdAt: new Date().toDateString(),
    },
    {
      authorId: "1",
      authorName: "Krezlau",
      text: "That's a really interesting story3.",
      id: "3",
      createdAt: new Date().toDateString(),
    },
  ];

  return <ul></ul>;
};

export default StoryCommentsList;
