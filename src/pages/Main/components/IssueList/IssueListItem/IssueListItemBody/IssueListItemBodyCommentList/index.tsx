// react
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { IssueContext } from "../../index.context";

// hooks
import { useOctokit } from "@/hooks";

// components
import { IssueComment } from "@/components/widgets/IssueComment";

// styles
import * as S from "./index.styles";

export function IssueListItemBodyCommentList() {
  const { owner, repo } = useParams();

  const { apiService } = useOctokit();

  const { number } = useContext(IssueContext);

  const comments = useQuery(
    ["issue", "comment", owner, repo, number],
    async () => {
      const comments = apiService.getIssueComments(
        owner || "",
        repo || "",
        number
      );

      return comments;
    }
  );

  if (!comments.data || comments.data.length === 0) {
    return null;
  }

  return (
    <S.CommentList>
      {comments.data.map((comment) => {
        const { id, body, html_url, user, reactions } = comment;

        return (
          <S.CommentItem key={id}>
            <IssueComment
              markdownText={body || ""}
              issueUrl={html_url}
              user={user}
              reactions={reactions}
            />
          </S.CommentItem>
        );
      })}
    </S.CommentList>
  );
}
