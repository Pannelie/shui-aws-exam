import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";

export const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <RegisterForm />
      <p>Har du redan ett konto?</p>
      <Button className="button" onClick={() => navigate("/login")} text="Klicka här för att logga in" />
    </>
  );
};
