import React, { createContext } from "react";

type ModalContextValue = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextValue>(
  {} as ModalContextValue
);

interface ModalContextProviderProps {
  children: React.ReactNode;

  value: ModalContextValue;
}

export function ModalContextProvider({
  children,
  value,
}: ModalContextProviderProps) {
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
