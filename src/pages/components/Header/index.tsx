import { css } from "@emotion/react";
import { color } from "@/assets/styles";

export function Header() {
  return (
    <div
      css={css`
        display: flex;

        justify-content: space-between;

        padding: 1.25rem;

        border-bottom: 1px solid ${color.border};
      `}
    >
      <div>
        <p>사용자 정보</p>
      </div>

      <div>
        <p>검색 창</p>
      </div>
    </div>
  );
}
