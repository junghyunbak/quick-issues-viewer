// react
import React, { MutableRefObject, createContext } from "react";

export const IssueListScrollContext = createContext<
  MutableRefObject<HTMLDivElement | null>
>({} as MutableRefObject<HTMLDivElement | null>);

interface IssueListScrollProviderProps {
  children: React.ReactNode;

  value: MutableRefObject<HTMLDivElement | null>;
}

export function IssueListScrollProvider({
  children,
  value,
}: IssueListScrollProviderProps) {
  return (
    <IssueListScrollContext.Provider value={value}>
      {children}
    </IssueListScrollContext.Provider>
  );
}
