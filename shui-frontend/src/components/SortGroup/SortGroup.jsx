import "./sortGroup.css";
import { FaSortAmountUp, FaSortAmountDown, FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa";

export const SortGroup = ({ label, type, activeSort, onToggle }) => {
  const isActive = activeSort === `${type}_asc` || activeSort === `${type}_desc`;
  const ascending = activeSort === `${type}_asc` || !isActive;

  const handleClick = () => {
    let newSortValue;

    if (!isActive) {
      newSortValue = `${type}_asc`;
    } else if (ascending) {
      newSortValue = `${type}_desc`;
    } else {
      newSortValue = null;
    }

    onToggle(newSortValue); // skickar sorteringsvärdet tillbaka till MessageSwitch
  };

  const getIcon = () => {
    if (!isActive) return type === "date" ? <FaSortAmountDown /> : <FaSortAlphaDown />; // visar default ikon
    if (type === "date") return ascending ? <FaSortAmountDown /> : <FaSortAmountUp />;
    if (type === "sender") return ascending ? <FaSortAlphaDown /> : <FaSortAlphaUp />;
    return null;
  };

  return (
    <button onClick={handleClick} className={`sort-toggle-button ${isActive ? "active" : ""}`} aria-label={label}>
      {getIcon()} {label}
    </button>
  );
};
