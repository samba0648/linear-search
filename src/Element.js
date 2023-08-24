
import { useEffect } from "react";

const Element = (props) => {
  const { element, target, search, isFound, setIsFound,index } = props;
  useEffect(()=>{
    if(!isFound.found && element.value === target){
      setIsFound({found:true,foundAt:index});
    }
  })
  return (
      <div
        className={`card mt-2 ${
          search && index <= isFound.foundAt
            ? isFound.foundAt === index && element.value === target
              ? "bg-success" // Highlight green if element matches
              : "bg-danger" // Highlight red if element doesn't match
            : "" 
        }`}
      >
        <div className="card-body">
          {element.value}
        </div>
      </div>
  );
};

export default Element;
