// react
import React, { MutableRefObject, createContext } from "react";

type IssueListRefsContextValue = {
  scrollRef: MutableRefObject<HTMLDivElement | null>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
};

export const IssueListRefsContext = createContext<IssueListRefsContextValue>(
  {} as IssueListRefsContextValue
);

interface IssueListRefsProviderProps {
  children: React.ReactNode;

  value: IssueListRefsContextValue;
}

export function IssueListRefsProvider({
  children,
  value,
}: IssueListRefsProviderProps) {
  return (
    <IssueListRefsContext.Provider value={value}>
      {children}
    </IssueListRefsContext.Provider>
  );
}
