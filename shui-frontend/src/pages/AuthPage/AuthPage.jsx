import { useLocation, useNavigate } from "react-router-dom";
import "./authPage.css";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { Logo } from "../../components/logo/Logo";
import { BottomImage } from "../../components/BottomImage/BottomImage";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { Button } from "../../components/Button/Button";
import { Message } from "../../components/Message/Message";

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
      <Layout className="page--padding">
        <Logo />
        {successMsg && <Message className="message--highlight" text={successMsg} />}
        {showForm && (
          <>
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <section className="button-section">
              {isLogin ? (
                <>
                  <Button className="button button--small" onClick={() => navigate("/register")} text="Skapa användare" />
                  <p className="button__info-text">Har du inte ett konto än?</p>
                </>
              ) : (
                <>
                  <Button className="button button--small" onClick={() => navigate("/login")} text="Logga in" />
                  <p className="button__info-text">Har du redan ett konto?</p>
                </>
              )}
            </section>
          </>
        )}
      </Layout>
      <BottomImage />
    </>
  );
};
