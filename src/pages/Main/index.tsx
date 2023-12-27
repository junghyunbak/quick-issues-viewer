// components
import { IssueList } from "@/pages/Main/components/IssueList";
import { LabelList } from "@/pages/Main/components/LabelList";
import { Header } from "@/pages/Main/components/Header";

// styles
import { css } from "@emotion/react";
import { size, color, device } from "@/assets/styles";

export function Main() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;

        height: 100vh;
      `}
    >
      <Header />

      <div
        css={css`
          flex: 1;
        `}
      >
        <div
          css={css`
            display: flex;

            height: 100%;
          `}
        >
          <div
            css={css`
              display: none;

              @media ${device.pc} {
                display: block;
              }

              width: ${size.SIDEBAR_WIDTH}px;

              border-right: 1px solid ${color.g200};
            `}
          >
            <LabelList />
          </div>

          <div
            css={css`
              flex: 1;
            `}
          >
            <IssueList />
          </div>
        </div>
      </div>
    </div>
  );
}
