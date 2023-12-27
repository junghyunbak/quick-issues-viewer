// react
import { useSearchParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color, device, size } from "@/assets/styles";

// utils
import queryString from "query-string";

import { type components } from "@octokit/openapi-types";

interface LabelListItemProps {
  label: components["schemas"]["label"];
}

export function LabelListItem({ label }: LabelListItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { label: selectedLabel } = queryString.parse(searchParams.toString());

  const handleLabelClick = (id: number | null) => () => {
    setSearchParams((prev) => {
      return {
        ...prev,
        label: id,
      };
    });
  };

  const isActive = label.id.toString() === selectedLabel;

  return (
    <li
      css={css`
        position: relative;

        display: flex;
        align-items: center;

        list-style: none;

        border-radius: ${size.BORDER_RADIUS}px;

        background-color: ${isActive ? color.g100 : "transparent"};

        cursor: pointer;

        &:hover {
          @media ${device.canHover} {
            background-color: ${color.g100};
          }
        }

        &::before {
          content: "";

          position: absolute;

          left: -8px;

          display: ${isActive ? "block" : "none"};

          border-radius: ${size.BORDER_RADIUS}px;

          width: 4px;
          height: 80%;

          background-color: rgb(9, 105, 218);
        }
      `}
      onClick={handleLabelClick(label.id)}
    >
      <div
        css={css`
          padding: 0.375rem 0.5rem;
        `}
      >
        <p
          css={css`
            text-align: start;
          `}
        >
          {label.name}
        </p>
      </div>
    </li>
  );
}
