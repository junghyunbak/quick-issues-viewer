// styles
import { css } from "@emotion/react";

// utils
import { findContrastColor } from "@/utils/color";

interface IssueListItemProps {
  labelName: string;
  labelBgColor: string;
}

export function IssueLabelListItem({
  labelName,
  labelBgColor,
}: IssueListItemProps) {
  return (
    <li
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #${labelBgColor};

        padding: 0 7px;

        border-radius: 2rem;
      `}
    >
      <span
        css={css`
          font-size: 12px;
          line-height: 18px;
          font-weight: 500;
          color: #${findContrastColor(labelBgColor || "ffffff")};
        `}
      >
        {labelName}
      </span>
    </li>
  );
}
