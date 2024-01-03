// react
import React, { createContext, useEffect, useState } from "react";

// apis
import { Octokit } from "octokit";
import { requestLog } from "@octokit/plugin-request-log";
import { type OctokitOptions } from "@octokit/core/dist-types/types";
import axios from "axios";

const MyOctoKit = Octokit.plugin(requestLog);

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
    const octokitOptions: OctokitOptions = {
      throttle: { enabled: false },
    };

    const logger =
      (logLevel: string, identifier: string) => (message: string) => {
        axios
          .post("/api/log/create", { identifier, logLevel, message })
          .catch();
      };

    const reissueAccessTokenSilently = async () => {
      const {
        data: { accessToken },
      } = await axios.post<{ accessToken: string | null }>(
        "/api/oauth/slient-refresh"
      );

      return accessToken;
    };

    const getUserIdentifier = async (accessToken: string | null) => {
      const {
        data: { identifier },
      } = await axios.post("/api/oauth/identifier", {
        accessToken: accessToken || "",
      });

      return identifier;
    };

    const accessToken = await reissueAccessTokenSilently();

    if (accessToken) {
      octokitOptions.auth = accessToken;
    }

    const identifier = await getUserIdentifier(accessToken);

    octokitOptions.log = {
      debug: logger("debug", identifier),
      info: logger("info", identifier),
      warn: logger("warn", identifier),
      error: logger("error", identifier),
    };

    setOctokit(new MyOctoKit(octokitOptions));
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
