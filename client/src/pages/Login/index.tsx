// react
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

// utils
import queryString from "query-string";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

// apis
import axios from "axios";

export function Login() {
  const [searchParams] = useSearchParams();

  const { code, error } = queryString.parse(searchParams.toString());

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (error || !code) {
      const redirectFrom = localStorage.getItem("redirect_from");

      window.location.href = redirectFrom || "/";

      return;
    }

    setIsValid(true);
  }, [error, code]);

  useEffect(() => {
    if (!isValid) {
      return;
    }

    axios
      .post("/api/oauth/login", { code })
      .then(() => {
        const redirectFrom = localStorage.getItem("redirect_from");

        window.location.href = redirectFrom || "/";

        return;
      })
      .catch((e) => {
        /**
         * useEffect 내에서 오류를 발생시켜 useErrorBoundary가 반응하도록 하기 위한 trick
         *
         * https://github.com/facebook/react/issues/14981
         */
        setIsValid(() => {
          throw e;
        });
      });
  }, [code, isValid, setIsValid]);

  if (!isValid) {
    return null;
  }

  return (
    <div
      css={css`
        position: absolute;
        inset: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <h3>Login...</h3>

      <ThreeDots color={color.g600} />
    </div>
  );
}
