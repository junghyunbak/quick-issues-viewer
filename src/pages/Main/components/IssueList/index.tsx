// react
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { useParams, useSearchParams } from "react-router-dom";

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
        [label as string],
        Number(per_page) || defaultValue.DEFAULT_PER_PAGE,
        Number(page) || 1
      );
    }
  );

  const [selectedIssueId, setSelectedIssueId] = useState<number | null>(null);

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

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1.25rem;

        padding: 1.25rem;
      `}
    >
      {issueList.data && (
        <Fragment>
          <ul
            css={css`
              width: 100%;

              border-radius: ${size.BORDER_RADIUS}px;
              border: 1px solid ${color.g200};

              overflow: hidden;
            `}
          >
            {issueList.data.issues.map((issue) => {
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

          <IssueListPaginate pageCount={issueList.data.pageCount} />
        </Fragment>
      )}
    </div>
  );
}
