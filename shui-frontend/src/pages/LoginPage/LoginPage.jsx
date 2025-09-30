import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Button } from "../../components/Button/Button";
import { Logo } from "../../components/logo/Logo";
import { BottomImage } from "../../components/BottomImage/BottomImage";
import "./loginPage.css";
import { Layout } from "../../components/Layout/Layout";

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      setShowForm(false);

      // Rensa meddelandet efter 3 sekunder (frivilligt)
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setShowForm(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowForm(true); // visa direkt om inget meddelande finns
    }
  }, [location]);

  return (
    <>
      <Layout>
        <Logo />
        {successMsg && <div className="message success">{successMsg}</div>}
        {showForm && (
          <>
            <LoginForm />
            <section className="login__button-section">
              <Button className="button" onClick={() => navigate("/")} text="Tillbaka" />
              <Button className="button" onClick={() => navigate("/register")} text="Skapa användare" />
            </section>
          </>
        )}
      </Layout>
      <BottomImage />
    </>
  );
};
