import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./loadingIcon.css"; // CSS för egen animation (valfritt)

export const LoadingIcon = ({ size = "2x" }) => {
  return (
    <div className="loading-icon">
      <FontAwesomeIcon icon={faSpinner} spin size={size} />
    </div>
  );
};
