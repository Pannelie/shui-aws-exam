import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Button } from "../../components/Button/Button";
import { Logo } from "../../components/logo/Logo";
import { BottomImage } from "../../components/BottomImage/BottomImage";
import "./loginPage.css";

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);

      // Rensa meddelandet efter 3 sekunder (frivilligt)
      const timer = setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      <section className="page login-page">
        <Logo />
        {successMsg && <div className="message success">{successMsg}</div>}
        <LoginForm />
        <section className="login__button-section">
          <Button className="button" onClick={() => navigate("/")} text="Tillbaka" />
          <Button className="button" onClick={() => navigate("/register")} text="Skapa användare" />
        </section>
      </section>
      <BottomImage />
    </>
  );
};
