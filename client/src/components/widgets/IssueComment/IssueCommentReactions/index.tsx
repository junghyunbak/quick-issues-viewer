// styles
import { css } from "@emotion/react";
import { color } from "@/assets/styles";

// apis
import { type components } from "@octokit/openapi-types";

interface IssueCommentReactionsProps {
  reactions: components["schemas"]["reaction-rollup"];
}

export function IssueCommentReactions({
  reactions,
}: IssueCommentReactionsProps) {
  return (
    <ul
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      `}
    >
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
              return "❤";
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
          <li
            key={key}
            css={css`
              display: flex;
              align-items: center;

              border-radius: 9999px;
              border: 1px solid ${color.g200};

              padding: 0.125rem 0.5rem;
            `}
          >
            <p
              css={css`
                font-size: 0.875rem;
                color: gray;
              `}
            >
              {`${emoji} ${value}`}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
