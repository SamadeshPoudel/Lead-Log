import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("token");
      navigate("/"); // or "/login"
    } else {
      navigate(-1); // go back to previous page if cancelled
    }
  }, [navigate]);

  return null;
}
