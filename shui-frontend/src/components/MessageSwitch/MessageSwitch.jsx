import "./messageSwitch.css";
import { Button } from "../Button/Button";
import { UserSwitchButton } from "..//UserSwitchButton/UserSwitchButton";

export const MessageSwitch = ({ view, setView }) => {
  const description = view === "all" ? "Alla meddelanden" : "Mina meddelanden";
  return (
    <div className="messages__switch">
      <UserSwitchButton type="all" active={view === "all"} onClick={() => setView("all")} />{" "}
      <UserSwitchButton type="mine" active={view === "mine"} onClick={() => setView("mine")} />
      <p className="messages__description">{description}</p>{" "}
    </div>
  );
};
