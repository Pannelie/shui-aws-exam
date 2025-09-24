import "./navBar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";

export const NavBar = () => {
  const Navigate = useNavigate();
  return (
    <nav className="navbar">
      <Button text="Home" onClick={() => Navigate("/")} />
      <Button text="My messages" onClick={() => Navigate("/messages")} />
    </nav>
  );
};
