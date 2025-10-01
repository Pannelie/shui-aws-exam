import { Logo } from "../logo/Logo";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { MessageSwitch } from "../MessageSwitch/MessageSwitch";
import "./header.css";

export const Header = ({ view, setView, showSwitch = true, activeSort, onToggle }) => {
  return (
    <section className={`header ${showSwitch ? "header--full" : "header--compact"}`}>
      <Logo />
      <LogoutButton />
      {showSwitch && view && setView && <MessageSwitch view={view} setView={setView} activeSort={activeSort} onToggle={onToggle} />}
    </section>
  );
};
