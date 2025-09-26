import { registerApi } from "../../api/auth";
import { Button } from "../Button/Button";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./registerForm.css";

// useRef är som en låda där du kan spara något mellan renderingar utan att React bryr sig om det.

export const RegisterForm = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "USER") {
      navigate("/messages", { replace: true });
    }
  }, [navigate]);

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await registerApi({
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (result.success) {
        // Rensa formulär
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";

        navigate("/login", {
          state: { message: "Användare skapad! Du kan nu logga in." },
        });
      } else {
        setError(result.message || "Registreringen misslyckades");
      }
    } catch (err) {
      console.error(err);
      setError("Något gick fel vid registreringen");
    }
  };
  return (
    <form className="form">
      <h1>Registrera användare</h1>
      <label className="form__label">
        Användarnamn: <input className="form__input" type="text" ref={usernameRef} />
      </label>
      <label className="form__label">
        Email:
        <input className="form__input" type="email" ref={emailRef} />
      </label>
      <label className="form__label">
        Lösenord:
        <input className="form__input" type="password" ref={passwordRef} />
      </label>
      <Button className="form__button" onClick={registerUser} text={"Registrera"} />
    </form>
  );
};
