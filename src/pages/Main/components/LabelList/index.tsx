// react
import { useState } from "react";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

// apis
import { apiSevice } from "@/apis";

// components
import { LabelListItem } from "./LabelListItem";
import { LabelListFilterInput } from "./LabelListFilterInput";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";

export function LabelList() {
  const { owner, repo } = useParams();

  const labelList = useQuery(["label", "list", owner, repo], async () => {
    return await apiSevice.getRepoIssueLabelList(owner || "", repo || "");
  });

  const [searchLabel, setSearchLabel] = useState("");

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
            border-bottom: 1px solid ${color.g200};
          `}
        >
          <LabelListFilterInput
            inputValue={searchLabel}
            setInputValue={setSearchLabel}
          />
        </div>
      }
      variableElement={
        <ul
          css={css`
            flex: 1;

            overflow: auto;

            padding: 1.25rem;
          `}
        >
          {labelList.data
            .filter((label) => {
              return label.name.startsWith(searchLabel);
            })
            .map((label) => {
              return <LabelListItem key={label.id} label={label} />;
            })}
        </ul>
      }
    />
  );
}
