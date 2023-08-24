import { useEffect } from "react";

const Element = ({
  array,
  element,
  target,
  search,
  isFound,
  setIsFound,
  index,
  setSearch,
  searchStates,
}) => {
  useEffect(() => {
    if (
      search === searchStates.IN_PROGRESS &&
      !isFound.found &&
      element.value === target
    ) {
      setSearch(searchStates.FINISHED);
      setIsFound({ found: true, foundAt: index });
    }
    if (
      search === searchStates.IN_PROGRESS &&
      !isFound.found &&
      element.value !== target &&
      index === array.length - 1
    ) {
      setSearch(searchStates.FINISHED);
    }
  }, [
    element.value,
    target,
    search,
    index,
    array.length,
    isFound.found,
    setSearch,
    setIsFound,
    searchStates,
  ]);

  const highlightClass =
    [searchStates.IN_PROGRESS, searchStates.FINISHED].includes(search) &&
    index <= isFound.foundAt &&
    element.value === target
      ? "bg-success"
      : [searchStates.IN_PROGRESS, searchStates.FINISHED].includes(search) &&
        index <= isFound.foundAt
      ? "bg-danger"
      : search === searchStates.FINISHED && !isFound.found
      ? "bg-danger"
      : "";

  return (
    <div className={`card mt-2 ${highlightClass}`}>
      <div className="card-body">{element.value}</div>
    </div>
  );
};

export default Element;
