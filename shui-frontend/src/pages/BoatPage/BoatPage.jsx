import "./boatPage.css";
import boat from "../../assets/vectors/top.png";
import ocean from "../../assets/vectors/BottomImage.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BoatPage = () => {
  const [showFinal, setShowFinal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFinal(true), 4000);
    const timer2 = setTimeout(() => navigate("/login"), 20000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);
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
