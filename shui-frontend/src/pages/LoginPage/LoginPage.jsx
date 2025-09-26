import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Button } from "../../components/Button/Button";

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
      {successMsg && <div className="message success">{successMsg}</div>}
      <LoginForm />
      <p>Inget konto?</p>
      <Button className="button" onClick={() => navigate("/register")} text="Klicka här för att registrera dig" />
    </>
  );
};
