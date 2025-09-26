import { loginApi } from "../../api/auth";
import { Button } from "../Button/Button";
import { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import "./loginForm.css";

// useRef är som en låda där du kan spara något mellan renderingar utan att React bryr sig om det.

export const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "USER") {
      navigate("/messages", { replace: true });
      return;
    }
    const storedRole = localStorage.getItem("role");
    if (storedRole === "USER") {
      navigate("/messages", { replace: true });
    }
  }, [user, navigate]);

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");

    const result = await loginApi({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
    if (result.success) {
      const { token, role } = result.data;
      setUser({ token, role: role.toUpperCase() });

      localStorage.setItem("token", token);
      localStorage.setItem("role", role.toUpperCase());

      navigate("/messages", {
        state: { message: "Du är nu inloggad" },
      });
      console.log(`token: ${token}`);
    } else {
      console.log(result.message);
      setError(result.message);
    }
  };

  return (
    <form className="form">
      <h1>Logga in</h1>
      {error && <p className="form__error">{error}</p>}
      <label className="form__label">
        Användarnamn: <input className="form__input" type="text" ref={usernameRef} />
      </label>
      <label className="form__label">
        Lösenord:
        <input className="form__input" type="password" ref={passwordRef} />
      </label>
      <Button className="form__button" onClick={loginUser} text={"Logga in"} />
    </form>
  );
};
