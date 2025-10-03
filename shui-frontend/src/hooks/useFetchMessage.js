import { useEffect, useState } from "react";
import { fetchMessageById } from "../utils/fetchMessageById";

export const useFetchMessage = ({ messageId, token, initialMessage = null }) => {
  const [message, setMessage] = useState(initialMessage); // <-- Lägg till denna
  const [loading, setLoading] = useState(!initialMessage && !!messageId);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!messageId || !token || initialMessage) return;

    const fetchMessage = async () => {
      setLoading(true);
      const result = await fetchMessageById(messageId, token);

      if (result.success) {
        setMessage(result.data);
      } else {
        setError(result.message);
      }

      setLoading(false);
    };

    fetchMessage();
  }, [messageId, token, initialMessage]);

  return { message, loading, error };
};
