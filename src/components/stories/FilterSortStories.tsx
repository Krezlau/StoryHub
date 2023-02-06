import React from "react";
import { FilterSortPanel } from "../../styled/components/stories/FilterSortStories";

const FilterSortStories: React.FC<{ sortByNewest: boolean ,toggleSortBy: () => void }> = (
  props
) => {

  const sortClickHandler = () => {
    props.toggleSortBy();
  };

  return (
    <FilterSortPanel>
      <button>xd</button>
      <button onClick={sortClickHandler}>
        {props.sortByNewest ? "Sort by: oldest" : "Sort by: newest"}
      </button>
    </FilterSortPanel>
  );
};

export default FilterSortStories;
