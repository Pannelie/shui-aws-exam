import "./sortGroup.css";
import { getSortIcon } from "../../utils/getSortIcon";

export const SortGroup = ({ label, type, activeSort, onToggle, activeUserFilter }) => {
  const isUserFilter = type === "user";
  const isActive = isUserFilter
    ? !!activeUserFilter // är något aktivt
    : activeSort === `${type}_asc` || activeSort === `${type}_desc`;

  if (isUserFilter && !isActive) return null;

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

  return (
    <button onClick={handleClick} className={`sort-toggle-button ${isActive ? "active" : ""}`} aria-label={label}>
      {getSortIcon(type, isActive, ascending)}
    </button>
  );
};
