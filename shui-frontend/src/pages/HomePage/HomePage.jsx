import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { BottomImage } from "../../components/BottomImage/BottomImage";
import { useUserStore } from "../../stores/useUserStore";
import "./homePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const { user } = useUserStore();

  useEffect(() => {
    if (user?.role === "USER") {
      navigate("/messages", { replace: true });
      return;
    }
    const storedRole = localStorage.getItem("role");
    if (storedRole === "USER") {
      navigate("/messages", { replace: true });
    }
  }, [user, navigate]);
  //Om man är inloggad hamnar man inte på startsidan utan ser alla sina meddelenaden direkt

  return (
    <section className="page">
      <section className="home">
        <h1 className="home__title">Välkommen till Shui!</h1>
        <p className="home__text">Logga in eller registrera dig för att se meddelanden.</p>
        <section className="home__button-section">
          <Button className="button home__button" onClick={() => navigate("/login")} text="Logga in" />
          <Button className="button home__button" onClick={() => navigate("/register")} text="Registrera" />
        </section>
      </section>
      <BottomImage />
    </section>
  );
};
