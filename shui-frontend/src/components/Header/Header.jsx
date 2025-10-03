import { useUserStore } from "../../stores/useUserStore";
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
  const { user } = useUserStore();
  return (
    <section className={`header ${showSwitch ? "header--full" : "header--compact"}`}>
      <Logo />
      <div className="header__top">
        <p className="header__user">{user?.username}</p>
        <LogoutButton />
      </div>
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
