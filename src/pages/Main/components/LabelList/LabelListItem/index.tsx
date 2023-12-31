// react
import React, { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color, device, size } from "@/assets/styles";

// utils
import queryString from "query-string";

// apis
import { type components } from "@octokit/openapi-types";

interface LabelListItemProps {
  label: components["schemas"]["label"];
}

export function LabelListItem({ label }: LabelListItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { label: selectedLabel } = queryString.parse(searchParams.toString());

  const isSelect = useMemo(() => {
    if (!selectedLabel) {
      return false;
    }

    if (typeof selectedLabel !== "string") {
      return false;
    }

    return selectedLabel.split(",").includes(label.name);
  }, [selectedLabel, label]);

  const handleChkboxClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { checked },
      } = e;

      setSearchParams(
        (prev) => {
          prev.delete("page");

          let labels: string | string[] | null = prev.get(
            /**
             * TODO: label -> labels
             */
            "label"
          );

          if (!labels) {
            if (checked) {
              prev.set("label", label.name);
            }

            return prev;
          }

          labels = labels.split(",");

          if (checked) {
            prev.set(
              "label",
              Array.from(new Set([...labels, label.name])).join(",")
            );
          } else {
            const index = labels.indexOf(label.name);

            if (index !== -1) {
              labels.splice(index, 1);

              prev.set("label", labels.join(","));
            }
          }

          return prev;
        },
        {
          replace: true,
        }
      );
    },
    [setSearchParams, label]
  );

  return (
    <li
      css={css`
        position: relative;

        display: flex;
        align-items: center;

        list-style: none;

        border-radius: ${size.BORDER_RADIUS}px;

        &:hover {
          @media ${device.canHover} {
            background-color: ${color.g100};
          }
        }
      `}
    >
      <label
        css={css`
          display: flex;
          width: 100%;

          padding: 0.375rem 0.5rem;

          cursor: pointer;

          gap: 0.375rem;
        `}
      >
        <input
          type="checkbox"
          onChange={handleChkboxClick}
          checked={isSelect}
        />

        <p
          css={css`
            text-align: start;
          `}
        >
          {label.name}
        </p>
      </label>
    </li>
  );
}
