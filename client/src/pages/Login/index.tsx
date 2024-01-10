// react
import { useSearchParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";

// utils
import queryString from "query-string";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

// apis
import axios from "axios";

export function Login() {
  const [searchParams] = useSearchParams();

  const { code } = queryString.parse(searchParams.toString());

  useQuery(
    ["oauth", "login", code],
    async () => {
      await axios.post("/api/oauth/login", { code });
    },
    {
      onSuccess() {
        const redirectFrom = localStorage.getItem("redirect_from");

        window.location.href = redirectFrom || "/";
      },
    }
  );

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
