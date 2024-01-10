// react
import React from "react";

// styles
import { css } from "@emotion/react";
import { size, device, color } from "@/assets/styles";

// svgs
import { ReactComponent as Hamburger } from "@/assets/svgs/hamburger.svg";

interface HamburgerMenuButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function HamburgerMenuButton(props: HamburgerMenuButtonProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0.5rem;

        cursor: pointer;

        border-radius: ${size.BORDER_RADIUS}px;

        &:hover {
          @media ${device.canHover} {
            background-color: ${color.g100};
          }
        }
      `}
      {...props}
    >
      <Hamburger />
    </div>
  );
}
