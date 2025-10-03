import "./sortGroup.css";
import { FaSortAmountUp, FaSortAmountDown, FaSortAlphaUp, FaSortAlphaDown, FaUser } from "react-icons/fa";

export const SortGroup = ({ label, type, activeSort, onToggle, activeUserFilter }) => {
  const isUserFilter = type === "user";
  const isActive = isUserFilter
    ? !!activeUserFilter // är något aktivt
    : activeSort === `${type}_asc` || activeSort === `${type}_desc`;
  const ascending = activeSort === `${type}_asc` || !isActive;

  const handleClick = () => {
    if (isUserFilter) {
      onToggle(activeUserFilter ? null : "user");
    } else {
      if (!isActive) onToggle(`${type}_asc`);
      else if (ascending) onToggle(`${type}_desc`);
      else onToggle(null);
    }
  };

  const getIcon = () => {
    if (isUserFilter) return <FaUser />;
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
