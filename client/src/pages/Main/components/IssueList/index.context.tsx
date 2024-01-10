// react
import React, { createContext, useState } from "react";

const useValue = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<number | null>(null);

  return { selectedIssueId, setSelectedIssueId };
};

export const IssueSelectionStateContext = createContext(
  {} as ReturnType<typeof useValue>
);

interface IssueSelectionStateProviderProps {
  children: React.ReactNode;
}

export function IssueSelectionStateProvider({
  children,
}: IssueSelectionStateProviderProps) {
  return (
    <IssueSelectionStateContext.Provider value={useValue()}>
      {children}
    </IssueSelectionStateContext.Provider>
  );
}
