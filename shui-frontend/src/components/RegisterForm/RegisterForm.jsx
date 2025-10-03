import { registerApi } from "../../api/auth";
import { Button } from "../Button/Button";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "../Message/Message";
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
      navigate("/messages/type/all", { replace: true });
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
        // Rensar mitt formulär
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";

        navigate("/login", {
          state: { message: "Användare skapad! Du kan nu logga in." },
        });
      } else {
        setError(result.message || "Registreringen misslyckades");
      }
    } catch (error) {
      console.error(error);
      setError("Något gick fel vid registreringen");
    }
  };
  return (
    <form className="form">
      <h1 className="form__title">Skapa användare</h1>
      <label className="form__label">
        <input className="form__input" type="text" ref={usernameRef} placeholder="Användarnamn" />
      </label>
      <label className="form__label">
        <input className="form__input" type="email" ref={emailRef} placeholder="Email" />
      </label>
      <label className="form__label">
        <input className="form__input" type="password" ref={passwordRef} placeholder="Lösenord" />
      </label>
      <Button className="form__button" onClick={registerUser} text={"Registrera"} />
      {error && <Message text={error} className="message--highlight message__form-error" />}
    </form>
  );
};
