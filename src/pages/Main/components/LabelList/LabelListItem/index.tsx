// react
import { useSearchParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";

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

  return (
    <li
      onClick={handleLabelClick(label.id)}
      css={css`
        list-style: none;
      `}
    >
      <p
        css={css`
          text-align: start;

          cursor: pointer;

          text-decoration: ${label.id.toString() === selectedLabel
            ? "underline"
            : "none"};
        `}
      >
        {label.name}
      </p>
    </li>
  );
}
