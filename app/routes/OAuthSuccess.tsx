import { useEffect } from "react";
import { useNavigate } from "react-router";


const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/admin"); 
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  return <h2>Logging in...</h2>;
};

export default OAuthSuccess;
