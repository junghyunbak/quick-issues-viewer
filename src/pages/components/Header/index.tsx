// components
import { Search } from "@/components/widgets/Search";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

export function Header() {
  return (
    <div
      css={css`
        display: flex;

        justify-content: space-between;

        padding: 1.25rem;

        border-bottom: 1px solid ${color.g200};
      `}
    >
      <div>
        <p>사용자 정보</p>
      </div>

      <Search />
    </div>
  );
}
