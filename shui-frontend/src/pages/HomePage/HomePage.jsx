import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { BottomImage } from "../../components/BottomImage/BottomImage";
import { useUserStore } from "../../stores/useUserStore";
import "./homePage.css";
import { Logo } from "../../components/logo/Logo";

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const token = user?.token || localStorage.getItem("token");
  const storedRole = user?.role || localStorage.getItem("role");

  useEffect(() => {
    // Navigera automatiskt till /messages om användaren är inloggad och token finns
    if (storedRole === "USER" && token) {
      navigate("/messages", { replace: true });
    }
  }, [storedRole, token, navigate]);
  //Om man är inloggad hamnar man inte på startsidan utan ser alla sina meddelenaden direkt

  return (
    <>
      <section className="page home-page">
        <Logo />
        <h1 className="home__title">Välkommen till Shui!</h1>
        <section className="home__button-section">
          {/* <section className="home__button-section"> */}
          <Button className="button home__button" onClick={() => navigate("/login")} text="Logga in" />
          <Button className="button home__button" onClick={() => navigate("/register")} text="Registrera" />
          {/* </section> */}
        </section>{" "}
        <p className="home__text">Logga in eller registrera dig för att se meddelanden.</p>
      </section>
      <BottomImage />
    </>
  );
};
