// react
import React, { createContext } from "react";

// apis
import { type components } from "@octokit/openapi-types";

export const IssueContext = createContext<components["schemas"]["issue"]>(
  {} as components["schemas"]["issue"]
);

interface IssueProviderProps {
  children: React.ReactNode;

  value: components["schemas"]["issue"];
}

export function IssueProvider({ children, value }: IssueProviderProps) {
  return (
    <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
  );
}
