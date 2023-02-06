import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { useNavigate } from "react-router-dom";
import StoryTag from "../stories/StoryTag";
import useHttp from "../../hooks/useHttp";
import useValidation from "../../hooks/useValidation";
import {
  FormActions,
  FormContent,
  FormTags,
} from "../../styled/components/forms/Form";
import {Button, LoadingSpinner} from "../../styled/components/UI/UIElements";
import {IStory} from "../../pages/AllStoriesPage";

const TAGS = [
  "choose a tag",
  "erotic",
  "ghosts",
  "horror",
  "zombies",
  "monsters",
  "aliens",
  "apocalypse",
  "dystopia",
  "utopia",
  "worldbuilding",
  "spiritual",
  "science fiction",
  "fantasy",
  "fairy tale",
  "mythology",
  "historical fiction",
  "historical",
  "time travel",
  "action",
  "superhero",
  "murder",
  "thriller",
  "humor",
  "legend",
  "young adult",
  "futuristic",
  "fiction",
  "cyberpunk",
  "dark fantasy",
  "comedy",
  "romance",
];

let isInitial = true;

const NewStoryForm: React.FC = () => {
  const userData = useSelector((state: IRootState) => state.auth);
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>(TAGS);
  const [selectedValue, setSelectedValue] = useState<string>("choose a tag");
  const { isLoading, error, setError, addNewStory } = useHttp();

  const {
    value: title,
    isValid: titleIsValid,
    valueChangeHandler: titleChangeHandler,
  } = useValidation((value) => value.trim().length > 3);

  const {
    value: text,
    isValid: textIsValid,
    valueChangeHandler: textChangeHandler,
  } = useValidation((value) => value.trim().length > 10);

  useEffect(() => {
    if (!isInitial && error === "" && !isLoading) {
      navigate("/stories");
      isInitial = true;
    }
  }, [navigate, error, isLoading]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!titleIsValid) {
      setError("Title is too short.");
      return;
    }
    if (!textIsValid) {
      setError("Text is too short.");
      return;
    }
    if (selectedTags.length === 0) {
      setError("Please choose at least one tag.");
      return;
    }

    const story: IStory = {
      title: title.trim(),
      text: text.trim(),
      author: userData.userName,
      userId: userData.userId,
      id: "",
      tags: selectedTags,
      createdAt: new Date(),
    };
    isInitial = false;

    addNewStory(story);
  };

  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value;
    setSelectedValue("choose a tag");

    if (selectedTags.length > 4 || val === "choose a tag") {
      return;
    }

    if (!selectedTags.find((t) => t === val)) {
      setSelectedTags((state) => [val, ...state]);
      setTagOptions((state) => state.filter((t) => t !== val));
    }
  };

  const tagDeleteHandler = (tag: string) => {
    setSelectedTags((state) => state.filter((t) => t !== tag));
    setTagOptions((state) => [tag, ...state]);
  };

  return (
    <Fragment>
      <FormContent>
        <form onSubmit={submitHandler}>
          <label htmlFor="title">Title</label>
          <input type="text" onChange={titleChangeHandler} value={title} />
          <label htmlFor="content">Text</label>
          <textarea onChange={textChangeHandler} value={text} />
          <label>Choose tags:</label>
          <select onChange={selectHandler} value={selectedValue}>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <FormTags>
            {selectedTags.map((t) => (
              <StoryTag key={t} tag={t} onDelete={tagDeleteHandler} />
            ))}
          </FormTags>
          <FormActions>
            {!isLoading && <Button type={"submit"}>Add</Button>}
            {isLoading && <LoadingSpinner />}
          </FormActions>
        </form>
      </FormContent>
    </Fragment>
  );
};

export default NewStoryForm;
