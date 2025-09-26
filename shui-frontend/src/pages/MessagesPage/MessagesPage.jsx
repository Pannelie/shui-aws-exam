import "./messagesPage.css";
import { NavBar } from "../../components/NavBar/NavBar";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";

export const MessagesPage = () => {
  return (
    <section className="page messages-page">
      <NavBar />
      MessagesPage
      <LogoutButton />
    </section>
  );
};
