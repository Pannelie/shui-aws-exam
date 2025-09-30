import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { BottomImage } from "../../components/BottomImage/BottomImage";
import { Logo } from "../../components/logo/Logo";
import { Layout } from "../../components/Layout/Layout";
import "./registerPage.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Logo />
        <RegisterForm />
        <section className="register__button-section">
          <Button className="button" onClick={() => navigate("/")} text="Tillbaka" />
          <Button className="button" onClick={() => navigate("/login")} text="Logga in" />
        </section>
      </Layout>
      <BottomImage />
    </>
  );
};
