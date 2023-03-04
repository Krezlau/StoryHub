import React, {ChangeEvent, useState} from "react";
import {FilterContent, FilterSortPanel} from "../../styled/components/stories/FilterSortStories";
import {TAGS} from "../forms/NewStoryForm";

const defaultSelect = "choose a tag";

const FilterSortStories: React.FC<{ sortByNewest: boolean ,toggleSortBy: () => void, filterValuesBy: (tag: string) => void }> = (
  props
) => {
  const [selectedTag, setSelectedTag] = useState(defaultSelect);

  const sortClickHandler = () => {
    props.toggleSortBy();
  };

  const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value;
    setSelectedTag(val);
    props.filterValuesBy(val);
  }

  const clearHandler = () => {
    props.filterValuesBy("");
    setSelectedTag(defaultSelect);
  }

  return (
    <FilterSortPanel>
      <FilterContent>
      <select onChange={selectHandler} value={selectedTag}>
        {TAGS.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
        <button onClick={clearHandler}>
          Clear
        </button>
      </FilterContent>
      <button onClick={sortClickHandler}>
        {props.sortByNewest ? "Sort by: oldest" : "Sort by: newest"}
      </button>
    </FilterSortPanel>
  );
};

export default FilterSortStories;
