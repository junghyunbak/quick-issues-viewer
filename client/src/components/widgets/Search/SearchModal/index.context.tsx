// react
import React, { createContext } from "react";

type InputContextValue = {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export const InputContext = createContext<InputContextValue>(
  {} as InputContextValue
);

interface IssueProviderProps {
  children: React.ReactNode;

  value: InputContextValue;
}

export function InputContextProvider({ children, value }: IssueProviderProps) {
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
}
