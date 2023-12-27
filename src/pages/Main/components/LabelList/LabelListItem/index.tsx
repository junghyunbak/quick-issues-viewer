// react
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color, device, size } from "@/assets/styles";

// utils
import queryString from "query-string";

// constants
import { ALL_SHOW_LABEL_ID } from "..";

import { type components } from "@octokit/openapi-types";

interface LabelListItemProps {
  label: components["schemas"]["label"];
}

export function LabelListItem({ label }: LabelListItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { label: selectedLabel } = queryString.parse(searchParams.toString());

  const handleLabelClick = (labelName: string) => () => {
    setSearchParams((prev) => {
      return {
        ...prev,
        label: labelName,
      };
    });
  };

  const isActive = useMemo(() => {
    if (!selectedLabel) {
      return label.id === ALL_SHOW_LABEL_ID;
    }

    return label.name === selectedLabel;
  }, [selectedLabel, label]);

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
      onClick={handleLabelClick(label.name)}
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
