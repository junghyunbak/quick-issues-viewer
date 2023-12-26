// components
import { IssueList } from "@/pages/Main/components/IssueLIst";
import { LabelList } from "@/pages/Main/components/labelList";
import { Header } from "@/pages/Main/components/Header";

// styles
import { css } from "@emotion/react";
import { size } from "@/assets/styles";

export function Main() {
  return (
    <div>
      <Header />

      <div
        css={css`
          width: 100%;
          max-width: ${size.BREAKPOINT_TABLET}px;
          margin: 0 auto;
        `}
      >
        <div
          css={css`
            display: flex;
          `}
        >
          <div
            css={css`
              width: ${size.SIDEBAR_WIDTH}px;
            `}
          >
            <LabelList />
          </div>

          <div
            css={css`
              width: 100%;
              flex-shrink: 1;
            `}
          >
            <IssueList />
          </div>
        </div>
      </div>
    </div>
  );
}
