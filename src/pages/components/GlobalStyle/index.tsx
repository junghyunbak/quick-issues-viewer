// react
import React from "react";

// styles
import { Global, css } from "@emotion/react";
import { device } from "@/assets/styles";

interface GlobalStyleProps {
  children: React.ReactNode;
}

const GlobalStyles = css`
  :root {
    font-size: 16px;

    @media ${device.mobile} {
      font-size: 14px;
    }
  }

  * {
    box-sizing: border-box;
    word-break: break-all;
  }

  ul,
  p,
  body {
    margin: 0;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
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
