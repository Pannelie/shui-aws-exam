import "./sortGroup.css";
import { FaArrowUp, FaArrowDown, FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa";
import { useState } from "react";

export const SortGroup = ({ label, type, onToggle }) => {
  const [ascending, setAscending] = useState(true); // default sort: ascending

  const handleClick = () => {
    let sortValue;

    if (type === "date") {
      sortValue = ascending ? "date_desc" : "date_asc";
    } else if (type === "sender") {
      sortValue = ascending ? "sender_desc" : "sender_asc";
    }

    setAscending(!ascending);
    onToggle(sortValue); // skickar sorteringsvärdet tillbaka till MessageSwitch
  };

  const getIcon = () => {
    if (type === "date") return ascending ? <FaArrowDown /> : <FaArrowUp />;
    if (type === "sender") return ascending ? <FaSortAlphaDown /> : <FaSortAlphaUp />;
    return null;
  };

  return (
    <button onClick={handleClick} className="sort-toggle-button">
      {getIcon()} {label}
    </button>
  );
};
