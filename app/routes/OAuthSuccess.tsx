import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);

      window.dispatchEvent(new Event("storage"));

      navigate("/admin-transactions");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging in...</p>;
};

export default OAuthSuccess;
