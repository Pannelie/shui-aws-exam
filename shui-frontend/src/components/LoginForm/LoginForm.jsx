import "./loginForm.css";
import { loginApi } from "../../api/auth";
import { Button } from "../Button/Button";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { Message } from "../Message/Message";
import { validateLogin } from "../../utils/validateUser";

// useRef är som en låda där du kan spara något mellan renderingar
// utan att React bryr sig om det.

export const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [error, setError] = useState("");

  useEffect(() => {
    // Förifyll med gästdata
    if (usernameRef.current && passwordRef.current) {
      usernameRef.current.value = "guest";
      passwordRef.current.value = "Guest1";
    }
  }, []);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (user?.role === "USER" || storedRole === "USER") {
      navigate("/messages/type/all", { replace: true });
    }
  }, [user, navigate]);

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");

    const validation = validateLogin({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });

    if (!validation.valid) {
      setError(validation.message);
      passwordRef.current.value = "";
      return;
    }
    try {
      const result = await loginApi({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      if (result.success) {
        const { token, role } = result.data;
        console.log(`token: ${token}`);
        const username = usernameRef.current.value;
        setUser({ token, role: role.toUpperCase(), username: usernameRef.current.value });

        localStorage.setItem("token", token);
        localStorage.setItem("role", role.toUpperCase());
        console.log(`Successfully logged in ${username}`);

        navigate("/messages/type/all", {
          state: { message: "Du är nu inloggad" },
        });
      } else {
        let message = result.message;
        if (message === "User not found") {
          message = "Ingen användare hittades";
        }
        if (message === "Wrong password") {
          message = "Användarnamn eller lösenord är fel";
        }
        console.log(result.message);
        setError(message);
      }
    } catch (error) {
      console.error(error);
      setError("Något gick fel vid inloggningen");
    }
  };

  return (
    <form className="form">
      <h1 className="form__title">Logga in</h1>
      <label className="form__label">
        <input className="form__input" type="text" ref={usernameRef} placeholder="guest" />
      </label>
      <label className="form__label">
        <input className="form__input" type="password" ref={passwordRef} placeholder="Guest1" />
      </label>
      <Button className="form__button" onClick={loginUser} text={"Logga in"} />
      {error && <Message text={error} className="message--highlight message__form-error" />}
    </form>
  );
};
