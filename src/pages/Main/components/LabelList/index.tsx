// react
import { Fragment } from "react";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";

// apis
import { apiSevice } from "@/apis";

// components
import { LabelListItem } from "./LabelListItem";

// zustand
import useStore from "@/store";

export function LabelList() {
  const { owner, repo } = useParams();

  const labelList = useQuery(["label", "list", owner, repo], async () => {
    return await apiSevice.getRepoIssueLabelList(owner || "", repo || "");
  });

  const [searchLabel] = useStore((state) => [state.searchLabel]);

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
    <ul
      css={css`
        padding: 1.25rem;
      `}
    >
      {labelList.data && (
        <Fragment>
          {labelList.data
            .filter((label) => {
              return label.name.startsWith(searchLabel);
            })
            .map((label) => {
              return <LabelListItem key={label.id} label={label} />;
            })}
        </Fragment>
      )}
    </ul>
  );
}
