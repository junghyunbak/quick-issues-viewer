// react
import { useQuery } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";

// utils
import queryString from "query-string";

// apis
import axios from "axios";
import { useOctokit } from "@/hooks";

export function Login() {
  const [searchParams] = useSearchParams();

  const { setAccessToken } = useOctokit();

  const { code } = queryString.parse(searchParams.toString());

  const login = useQuery(
    ["oauth", "login", code],
    async () => {
      const {
        data: { accessToken },
      } = await axios.post("/api/oauth/login", { code });

      return accessToken;
    },
    {
      onSuccess(accessToken) {
        setAccessToken(accessToken);
      },
    }
  );

  if (login.isLoading) {
    return (
      <div>
        <p>login...</p>
      </div>
    );
  }

  /**
   * TODO: 사용자가 로그인 이전에 있던 페이지로 돌려주도록 구현
   */
  return <Navigate to="/" />;
}
