import { Suspense } from "react";
import { LogList } from "./components/LogList";

import { css } from "@emotion/react";

export function Monitoring() {
  return (
    <div
      css={css`
        position: absolute;
        inset: 0;

        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;

          overflow: scroll;
        `}
      >
        <Suspense fallback={<p>로그 로딩중...</p>}>
          <LogList />
        </Suspense>
      </div>
    </div>
  );
}
