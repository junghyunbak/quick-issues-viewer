// styles
import * as S from "./index.styles";

// apis
import { type components } from "@octokit/openapi-types";

interface IssueCommentReactionsProps {
  reactions: components["schemas"]["reaction-rollup"];
}

export function IssueCommentReactions({
  reactions,
}: IssueCommentReactionsProps) {
  return (
    <S.ReactionList>
      {Object.entries(reactions).map(([key, value]) => {
        if (key === "url" || key === "total_count") {
          return null;
        }

        if (value === 0) {
          return null;
        }

        const emoji = (() => {
          switch (key) {
            case "+1":
              return "👍";
            case "-1":
              return "👎";
            case "laugh":
              return "😄";
            case "confused":
              return "😕";
            case "heart":
              return "❤️️";
            case "hooray":
              return "🎉";
            case "eyes":
              return "👀";
            case "rocket":
              return "🚀";
            default:
              return "";
          }
        })();

        return (
          <S.ReactionItem key={key}>
            <S.ReactionItemParagraph>
              {`${emoji} ${value}`}
            </S.ReactionItemParagraph>
          </S.ReactionItem>
        );
      })}
    </S.ReactionList>
  );
}
