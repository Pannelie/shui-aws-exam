import "./homePage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import boat from "../../assets/vectors/top.png";
import ocean from "../../assets/vectors/BottomImage.png";

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const token = user?.token || localStorage.getItem("token");
  const storedRole = user?.role || localStorage.getItem("role");

  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFinal(true), 3000);
    const timer2 = setTimeout(() => navigate("/login"), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  useEffect(() => {
    // Navigera automatiskt till /messages om användaren är inloggad och token finns
    if (storedRole === "USER" && token) {
      navigate("/messages/type/all", { replace: true });
    }
  }, [storedRole, token, navigate]);
  //Om man är inloggad hamnar man inte på startsidan utan ser alla sina meddelenaden direkt

  return (
    <div className="ocean-container">
      <div className="ocean-blue"></div>
      <img src={ocean} alt="ocean-image" className="ocean-image ocean-image--back" />
      <div className={`boat ${showFinal ? "boat-final" : ""}`}>
        <img src={boat} alt="S-båt" className="boat-image" />
      </div>
      <img src={ocean} alt="ocean-image" className="ocean-image ocean-image--front" />

      <h1 className={`app-title ${showFinal ? "app-title--visible" : ""}`}>Shui</h1>
      <h2 className={`app-subtitle ${showFinal ? "app-subtitle--visible" : ""}`}>din personliga anslagstavla</h2>
    </div>
  );
};
