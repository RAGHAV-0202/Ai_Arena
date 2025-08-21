import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectNewChat() {
  const navigate = useNavigate();

  useEffect(() => {
    const uid = crypto.randomUUID();
    navigate(`/chat/${uid}`, { replace: true }); 
  }, [navigate]);

  return null;
}

export default RedirectNewChat;
