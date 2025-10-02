import { useLocation, useNavigate } from "react-router-dom";
import "./authPage.css";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { Logo } from "../../components/logo/Logo";
import { BottomImage } from "../../components/BottomImage/BottomImage";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { Button } from "../../components/Button/Button";

export const AuthPage = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  //true / false
  const isLogin = type === "login";

  useEffect(() => {
    if (isLogin && location.state?.message) {
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
  }, [location, isLogin]);

  return (
    <>
      <Layout>
        <Logo />
        {successMsg && <div className="message success">{successMsg}</div>}
        {showForm && (
          <>
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <section className={`${type}__button-section`}>
              <Button className="button" onClick={() => navigate("/")} text="Tillbaka" />
              {isLogin ? (
                <Button className="button" onClick={() => navigate("/register")} text="Skapa användare" />
              ) : (
                <Button className="button" onClick={() => navigate("/login")} text="Logga in" />
              )}
            </section>
          </>
        )}
      </Layout>
      <BottomImage />
    </>
  );
};
