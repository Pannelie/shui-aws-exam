import { Logo } from "../logo/Logo";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { MessageSwitch } from "../MessageSwitch/MessageSwitch";
import "./header.css";

export const Header = ({
  view,
  setView,
  showSwitch = true,
  activeSort,
  onToggle,
  activeUserFilter,
  onClearUserFilter,
  setActiveUserFilter,
}) => {
  return (
    <section className={`header ${showSwitch ? "header--full" : "header--compact"}`}>
      <Logo />
      <LogoutButton />
      {showSwitch && view && setView && (
        <MessageSwitch
          view={view}
          setView={setView}
          activeSort={activeSort}
          onToggle={onToggle}
          activeUserFilter={activeUserFilter}
          onClearUserFilter={onClearUserFilter}
          setActiveUserFilter={setActiveUserFilter}
        />
      )}
    </section>
  );
};
