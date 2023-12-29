// react
import { useState } from "react";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

// apis
import { apiSevice } from "@/apis";

// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// constants
import { defaultValue } from "@/constants";

// components
import { IssueListItem } from "./IssueListItem";
import { IssueListPaginate } from "./IssueListPaginate";

// utils
import queryString from "query-string";

export function IssueList() {
  const { owner, repo } = useParams();

  const [searchParams] = useSearchParams();

  const { label, per_page, page } = queryString.parse(searchParams.toString());

  const issueList = useQuery(
    ["issue", "list", owner, repo, label, per_page, page],
    async () => {
      return await apiSevice.getRepoIssueList(
        owner || "",
        repo || "",
        (label as string) || "",
        Number(per_page) || defaultValue.DEFAULT_PER_PAGE,
        Number(page) || 1
      );
    }
  );

  const [selectedIssueId, setSelectedIssueId] = useState<number | null>(null);

  if (issueList.isError) {
    return <Navigate replace to="/404" />;
  }

  if (issueList.isLoading) {
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

  const isIssueExist = !(!issueList.data || issueList.data.items.length === 0);

  const issueTotalCount = isIssueExist ? issueList.data.total_count : 0;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1.25rem;

        padding: 1.25rem;
      `}
    >
      {isIssueExist && (
        <ul
          css={css`
            width: 100%;

            border-radius: ${size.BORDER_RADIUS}px;
            border: 1px solid ${color.g200};

            overflow: hidden;
          `}
        >
          {issueList.data.items.map((issue) => {
            return (
              <IssueListItem
                key={issue.id}
                issue={issue}
                selectedIssueId={selectedIssueId}
                setSelectedIssueId={setSelectedIssueId}
              />
            );
          })}
        </ul>
      )}

      <IssueListPaginate
        /**
         * 글이 하나라도 존재할 경우 페이지의 개수는 1이상이기 때문에 Math.floor가 아닌 Math.ceil를 사용해야 함.
         *
         * 단, Math.ceil을 사용 할 경우 조회 제한 개수 1000개를 넘어가게 될 수 있어 오류가 발생할 수 있음.
         */
        pageCount={Math.ceil(
          Math.min(issueTotalCount, 1000) /
            (Number(per_page) || defaultValue.DEFAULT_PER_PAGE)
        )}
      />
    </div>
  );
}
