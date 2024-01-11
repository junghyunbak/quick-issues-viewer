// react
import React, { createContext, useEffect, useState } from "react";

// apis
import { Octokit } from "octokit";
import { type Octokit as OctokitCore } from "@octokit/core";
import { type OctokitOptions } from "@octokit/core/dist-types/types";
import axios from "axios";

const requestLog = (isLogin: boolean) => (octokit: OctokitCore) => {
  octokit.hook.wrap("request", (request, options) => {
    octokit.log.debug("request", options);

    const start = Date.now();
    const requestOptions = octokit.request.endpoint.parse(options);
    const path = requestOptions.url.replace(options.baseUrl, "");

    return (request as typeof octokit.request)(options)
      .then((response) => {
        axios.post("/api/log", {
          method: requestOptions.method,
          status: response.status,
          path,
          time: Date.now() - start,
          isLogin,
        });

        return response;
      })

      .catch((error) => {
        axios.post("/api/log", {
          method: requestOptions.method,
          status: error.status,
          path,
          time: Date.now() - start,
          isLogin,
        });

        throw error;
      });
  });
};

type OctokitContextValue = {
  octokit: Octokit;
};

export const OctokitContext = createContext<OctokitContextValue>(
  {} as OctokitContextValue
);

interface OctokitProviderProps {
  children: React.ReactNode;
}

export function OctokitProvider({ children }: OctokitProviderProps) {
  const [octokit, setOctokit] = useState<Octokit | null>(null);

  const initializeOctokit = async () => {
    const reissueAccessTokenSilently = async () => {
      try {
        const {
          data: { accessToken },
        } = await axios.post<{ accessToken: string | null }>(
          "/api/oauth/silent-refresh"
        );

        return accessToken;
      } catch (e) {
        return null;
      }
    };

    const accessToken = await reissueAccessTokenSilently();

    const MyOctoKit = Octokit.plugin(requestLog(accessToken ? true : false));

    const octokitOptions: OctokitOptions = {};

    if (accessToken) {
      octokitOptions.auth = accessToken;
    } else {
      octokitOptions.throttle = { enabled: false };
    }

    const octokit = new MyOctoKit(octokitOptions);

    setOctokit(octokit);
  };

  useEffect(() => {
    initializeOctokit();
  }, []);

  if (!octokit) {
    return null;
  }

  return (
    <OctokitContext.Provider value={{ octokit }}>
      {children}
    </OctokitContext.Provider>
  );
}
