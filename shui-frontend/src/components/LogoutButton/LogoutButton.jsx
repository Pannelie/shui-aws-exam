import "./logoutButton.css";
import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const LogoutButton = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const onClick = () => {
    // Ta bort token och role från localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Nollställ användaren i store
    setUser(null);

    // Navigera till startsidan
    navigate("/login", { replace: true });
  };
  return (
    <>
      <button onClick={onClick} className="logout-button">
        <FontAwesomeIcon icon={faRightFromBracket} className="logout-icon" />
      </button>
    </>
  );
};
