// react
import React, { useCallback, useMemo } from "react";

// components
import { IssueListItemLabelList } from "@/pages/Main/components/IssueList/IssueListItem/IssueListItemLabelList";

// svgs
import { ReactComponent as IssueOpened } from "@/assets/svgs/issue-opened.svg";
import { ReactComponent as IssueClosed } from "@/assets/svgs/issue-closed.svg";
import { ReactComponent as PrOpened } from "@/assets/svgs/pr-opened.svg";
import { ReactComponent as PrClosed } from "@/assets/svgs/pr-closed.svg";

// styles
import { css } from "@emotion/react";
import { color, device } from "@/assets/styles";

import { type components } from "@octokit/openapi-types";

interface IssueListItemProps {
  issue: components["schemas"]["issue"];

  selectedIssueId: number | null;
  setSelectedIssueId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function IssueListItem({
  issue,
  selectedIssueId,
  setSelectedIssueId,
}: IssueListItemProps) {
  const { id, title, labels, state, pull_request, body, user } = issue;

  const handleIssueItemClick = useCallback(
    (issueId: number) => {
      return () => {
        setSelectedIssueId((prev) => {
          if (prev === issueId) {
            return null;
          }

          return issueId;
        });
      };
    },
    [setSelectedIssueId]
  );

  const StatusIcon = useMemo<React.ReactNode>(() => {
    if (pull_request) {
      return state === "open" ? (
        <PrOpened
          css={css`
            path {
              fill: ${color.success};
            }
          `}
        />
      ) : (
        <PrClosed
          css={css`
            path {
              fill: ${color.complete};
            }
          `}
        />
      );
    }

    return state === "open" ? (
      <IssueOpened
        css={css`
          path {
            fill: ${color.success};
          }
        `}
      />
    ) : (
      <IssueClosed
        css={css`
          path {
            fill: ${color.complete};
          }
        `}
      />
    );
  }, [state, pull_request]);

  return (
    <li
      css={css`
        display: flex;
        flex-direction: column;

        list-style: none;
      `}
      onClick={handleIssueItemClick(id)}
    >
      <div
        css={css`
          display: flex;

          padding: 0.5rem;

          gap: 0.5rem;

          &:hover {
            @media ${device.canHover} {
              background-color: ${color.g100};
            }
          }

          cursor: pointer;
        `}
      >
        <div>{StatusIcon}</div>

        <div
          css={css`
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.375em;

            flex-basis: content;
          `}
        >
          <p>{title}</p>

          <IssueListItemLabelList labels={labels} />
        </div>
      </div>

      {selectedIssueId === id && (
        <div
          css={css`
            border-top: 1px solid ${color.g200};

            padding: 0.5rem;
          `}
        >
          <div>
            <img
              src={user?.avatar_url}
              css={css`
                width: 2rem;
                height: 2rem;
                border-radius: 9999px;
              `}
              alt="issue-writer-profile-image"
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: body || "" }} />
        </div>
      )}
    </li>
  );
}
