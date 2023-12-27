// react
import { useQuery } from "react-query";
import { Blocks } from "react-loader-spinner";
import { useParams } from "react-router-dom";

// styles
import { css } from "@emotion/react";

// apis
import { apiSevice } from "@/apis";

// components
import { LabelListItem } from "./LabelListItem";

export function LabelList() {
  const { owner, repo } = useParams();

  const labelList = useQuery(["label", "list", owner, repo], async () => {
    return await apiSevice.getRepoIssueLabelList(owner, repo);
  });

  if (labelList.isError) {
    return null;
  }

  if (labelList.isLoading) {
    return <Blocks />;
  }

  if (!labelList.data) {
    return null;
  }

  return (
    <div
      css={css`
        padding: 1.25rem;
      `}
    >
      {labelList.data && (
        <ul
          css={css`
            padding: 0;
          `}
        >
          {/**
           * TODO: 얘도 라벨 리스트 아이템 컴포넌트로 대체
           */}
          <LabelListItem
            label={{
              id: -1,
              node_id: "",
              url: "",
              name: "all",
              description: "",
              color: "",
              default: false,
            }}
          />

          {labelList.data.map((label) => {
            return <LabelListItem key={label.id} label={label} />;
          })}
        </ul>
      )}
    </div>
  );
}
