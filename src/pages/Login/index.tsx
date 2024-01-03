// react
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// utils
import queryString from "query-string";

// apis
import axios from "axios";

export function Login() {
  const [searchParams] = useSearchParams();

  const { code } = queryString.parse(searchParams.toString());

  useEffect(() => {
    axios.post("/api/oauth/login", { code }).then(() => {
      window.location.href = "/";
    });
  }, [code]);

  return (
    <div>
      <p>login...</p>
    </div>
  );
}
