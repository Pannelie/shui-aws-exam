import { FaSortAmountUp, FaSortAmountDown, FaSortAlphaUp, FaSortAlphaDown, FaUser } from "react-icons/fa";

//Tydligen bättre att definiera functions istället för const när
// det är utilities som jag exporterar och använder på flera ställen.
// Har jag saker som ska utföras inuti denna function så
// använder jag const inuti.
export function getSortIcon(type, isActive, ascending) {
  if (type === "user") return <FaUser />;
  if (!isActive) return type === "date" ? <FaSortAmountDown /> : <FaSortAlphaDown />;
  if (type === "date") return ascending ? <FaSortAmountDown /> : <FaSortAmountUp />;
  if (type === "sender") return ascending ? <FaSortAlphaDown /> : <FaSortAlphaUp />;
  return null;
}
