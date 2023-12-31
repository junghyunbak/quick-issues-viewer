// react
import React from "react";

// styles
import { Global, css } from "@emotion/react";
import { device } from "@/assets/styles";
import "@/assets/fonts/font.css";

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

  *:not(.markdown-body *) {
    box-sizing: border-box;
    word-break: break-all;
    font-family: "Segoe UI";
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
