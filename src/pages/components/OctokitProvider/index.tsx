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
    const logger =
      (logLevel: "debug" | "info" | "warn" | "error") =>
      async (message: string) => {
        if (logLevel === "debug") {
          return;
        }

        try {
          axios.post("/api/log", { logLevel, message });
        } catch (e) {
          console.log(e);
        }
      };

    const octokitOptions: OctokitOptions = {
      log: {
        debug: logger("debug"),
        info: logger("info"),
        warn: logger("warn"),
        error: logger("error"),
      },
    };

    const reissueAccessTokenSilently = async () => {
      const {
        data: { accessToken },
      } = await axios.post<{ accessToken: string | null }>(
        "/api/oauth/slient-refresh"
      );

      return accessToken;
    };

    const accessToken = await reissueAccessTokenSilently();

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
