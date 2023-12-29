// react
import React, { useState, Fragment, useCallback } from "react";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// apis
import { apiSevice } from "@/apis";

// components
import { LabelListItem } from "./LabelListItem";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";

// svgs
import { ReactComponent as Magnifier } from "@/assets/svgs/magnifier.svg";

export const ALL_SHOW_LABEL_ID = -1;

export function LabelList() {
  const { owner, repo } = useParams();

  const labelList = useQuery(["label", "list", owner, repo], async () => {
    return await apiSevice.getRepoIssueLabelList(owner, repo);
  });

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  if (labelList.isLoading) {
    return (
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          height: 100%;
        `}
      >
        <RotatingLines width="2rem" strokeColor="gray" />
      </div>
    );
  }

  if (!labelList.data) {
    return null;
  }

  return (
    <FixedAndVariableLayout
      direction="column"
      fixedElement={
        <div
          css={css`
            padding: 1.25rem;

            border-bottom: 1px solid ${color.g200};
          `}
        >
          <label
            css={css`
              display: flex;
              align-items: center;

              border: 1px solid ${color.g200};
              border-radius: ${size.BORDER_RADIUS}px;

              padding: 0.5rem;

              gap: 0.25rem;
            `}
          >
            <Magnifier />

            <input
              css={css`
                width: 100%;

                outline: none;
                border: 0;
              `}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="label"
            />
          </label>
        </div>
      }
      variableElement={
        <ul
          css={css`
            padding: 1.25rem;
          `}
        >
          {labelList.data && (
            <Fragment>
              <LabelListItem
                label={{
                  id: ALL_SHOW_LABEL_ID,
                  node_id: "",
                  url: "",
                  name: "all",
                  description: "",
                  color: "",
                  default: false,
                }}
              />

              {labelList.data
                .filter((label) => {
                  return label.name.startsWith(inputValue);
                })
                .map((label) => {
                  return <LabelListItem key={label.id} label={label} />;
                })}
            </Fragment>
          )}
        </ul>
      }
    />
  );
}
