import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./Form.module.css";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { IStory } from "../../store/stories-slice";
import { IRootState } from "../../store";
import { useNavigate } from "react-router-dom";
import StoryTag from "../stories/StoryTag";
import useHttp from "../../hooks/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";

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
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>(TAGS);
  const [selectedValue, setSelectedValue] = useState<string>("choose a tag");
  const { isLoading, error, addNewStory } = useHttp();

  useEffect(() => {
    if (!isInitial && error === "" && !isLoading) {
      navigate("/stories");
      isInitial = true;
    }
  }, [navigate, error, isLoading]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const title = titleRef.current!.value;
    const text = textRef.current!.value;

    // validate

    const story: IStory = {
      title: title,
      text: text,
      author: userData.userName,
      userId: userData.userId,
      id: "",
      tags: selectedTags,
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
      <div className={classes.content}>
        <form onSubmit={submitHandler}>
          <label htmlFor="title">Title</label>
          <input type="text" ref={titleRef} />
          <label htmlFor="content">Text</label>
          <textarea ref={textRef} />
          <label>Choose tags:</label>
          <select onChange={selectHandler} value={selectedValue}>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className={classes.tags}>
            {selectedTags.map((t) => (
              <StoryTag key={t} tag={t} onDelete={tagDeleteHandler} />
            ))}
          </div>
          <div className={classes.actions}>
            {!isLoading && <Button type={"submit"}>Add</Button>}
            {isLoading && <LoadingSpinner />}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default NewStoryForm;
