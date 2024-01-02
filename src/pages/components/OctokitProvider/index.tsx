// react
import React, { createContext, useState } from "react";
import { useQuery } from "react-query";

// apis
import { Octokit } from "octokit";
import { requestLog } from "@octokit/plugin-request-log";
import { type OctokitOptions } from "@octokit/core/dist-types/types";
import axios from "axios";

const MyOctoKit = Octokit.plugin(requestLog);

type OctokitContextValue = {
  octokit: Octokit;

  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const OctokitContext = createContext<OctokitContextValue>(
  {} as OctokitContextValue
);

interface OctokitProviderProps {
  children: React.ReactNode;
}

/**
 * API는 왠만한 컴포넌트에 다 사용되고 로그인, 로그아웃시에만 accessToken값이 변경되므로
 * context를 사용하여 구현하였다.
 *
 * 로그인, 로그아웃시 마저 성능을 최적화하려면 지역 상태를 전역 상태로 변경하고 context를 제거하면 된다.
 */
export function OctokitProvider({ children }: OctokitProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [octokit, setOctokit] = useState<Octokit | null>(null);

  useQuery(
    ["octokit", "provider", accessToken],
    async () => {
      const octokitOptions: OctokitOptions = {
        throttle: { enabled: false },
      };

      const logger =
        (logLevel: string, userName?: string) => (message: string) => {
          console.log(
            `[user: ${userName}] [level: ${logLevel}] [date: ${new Date().toISOString()}] ${message}`
          );
        };

      /**
       * 1. AT 상태를 검사한 후 경우에 따라 AT 재발급을 시도
       *
       * - null: 최초 접속, 새로고침, 로그아웃 시 상태
       * - string: 로그인 과정을 거쳤을 경우의 상태
       *
       * AT의 상태값이 null 이더라도 최초 접속, 새로고침 으로 인해 토큰의 상태가 휘발되었을 뿐
       * RT가 존재하여 다시 AT를 발급받을 수 있는 상황일 수 있기 때문에 재발급을 시도해야 함.
       */
      const reissueAccessTokenSilently = async () => {
        const {
          data: { accessToken },
        } = await axios.post("/api/oauth/slient-refresh");

        return accessToken;
      };

      const at = accessToken || (await reissueAccessTokenSilently());

      /**
       * 2. AT 토큰의 존재 여부에 따라 인증 된/인증되지 않은 octokit 인스턴스를 생성
       */
      if (at) {
        octokitOptions.auth = at;
      }

      /**
       * 3. 사용자를 식별할 값을 서버에 요청
       *
       * AT가 유효할 경우(로그인 되어있을경우) 사용자 이름을, 그렇지 않을 경우 ip값을 가져옴
       */
      const {
        data: { identifier },
      } = await axios.post("/api/oauth/identifier", { accessToken: at || "" });

      octokitOptions.log = {
        debug: logger("debug", identifier),
        info: logger("info", identifier),
        warn: logger("warn", identifier),
        error: logger("error", identifier),
      };

      return new MyOctoKit(octokitOptions);
    },
    {
      onSuccess(octokit) {
        setOctokit(octokit);
      },
    }
  );

  if (!octokit) {
    return null;
  }

  return (
    <OctokitContext.Provider value={{ setAccessToken, octokit }}>
      {children}
    </OctokitContext.Provider>
  );
}
