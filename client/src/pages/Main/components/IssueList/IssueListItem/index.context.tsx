// react
import React, { createContext } from "react";

// apis
import { type components } from "@octokit/openapi-types";

export const IssueContext = createContext<
  components["schemas"]["issue-search-result-item"]
>({} as components["schemas"]["issue-search-result-item"]);

interface IssueProviderProps {
  children: React.ReactNode;

  value: components["schemas"]["issue-search-result-item"];
}

export function IssueProvider({ children, value }: IssueProviderProps) {
  return (
    <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
  );
}
