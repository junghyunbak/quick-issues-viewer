// react
import { useQuery } from "react-query";
import { Blocks } from "react-loader-spinner";
import { useParams } from "react-router-dom";

// apis
import { apiSevice } from "@/apis";

// styles
import { css } from "@emotion/react";

// components
import { IssueListItem } from "./IssueListItem";

export function IssueList() {
  const { owner, repo } = useParams();

  const issueList = useQuery(
    ["issue", "list", owner, repo],
    async () => {
      return await apiSevice.getRepoIssueList(owner, repo);
    },
    {
      onError: (e) => {
        console.log("에러 발생", e);
      },
    }
  );

  if (issueList.isError) {
    return (
      <div>
        <p>해당 레포지토리를 찾을 수 없습니다.</p>
      </div>
    );
  }

  if (issueList.isLoading) {
    return <Blocks />;
  }

  if (!issueList.data) {
    return null;
  }

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      {issueList.data.length > 0 ? (
        <ul>
          {issueList.data.map((issue) => {
            return <IssueListItem issue={issue} />;
          })}
        </ul>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
}
