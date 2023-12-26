// react
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHomeButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <p>404 Not Found</p>
      <button type="button" onClick={handleGoHomeButtonClick}>
        go home
      </button>
    </div>
  );
}
