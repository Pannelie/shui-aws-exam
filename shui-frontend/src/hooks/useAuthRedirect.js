import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = (token) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);
};
