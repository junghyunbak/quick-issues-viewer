// react
import React from "react";

// styles
import { Global, css } from "@emotion/react";

interface GlobalStyleProps {
  children: React.ReactNode;
}

const GlobalStyles = css`
  :root {
    font-size: 16px;
    box-sizing: border-box;
  }

  p,
  body {
    margin: 0;
  }
`;

export function GlobalStyle({ children }: GlobalStyleProps) {
  return (
    <div>
      <Global styles={GlobalStyles} />
      {children}
    </div>
  );
}
