// react
import React, { useCallback, useMemo } from "react";

// components
import { IssueListItemLabelList } from "@/pages/Main/components/IssueList/IssueListItem/IssueListItemLabelList";

// svgs
import { ReactComponent as IssueOpened } from "@/assets/svgs/issue-opened.svg";
import { ReactComponent as IssueClosed } from "@/assets/svgs/issue-closed.svg";

// styles
import { css } from "@emotion/react";
import { color, device } from "@/assets/styles";

// apis
import { type components } from "@octokit/openapi-types";

interface IssueListItemProps {
  issue: components["schemas"]["issue-search-result-item"];

  selectedIssueId: number | null;
  setSelectedIssueId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function IssueListItem({
  issue,
  selectedIssueId,
  setSelectedIssueId,
}: IssueListItemProps) {
  const { id, title, labels, state, body, user, created_at } = issue;

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
  }, [state]);

  return (
    <li
      css={css`
        display: flex;
        flex-direction: column;

        list-style: none;

        border-bottom: 1px solid ${color.g200};

        &:last-child {
          border-bottom: 0;
        }
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
        <div
          css={css`
            padding-left: 0.25rem;
          `}
        >
          {StatusIcon}
        </div>

        <div>
          <div
            css={css`
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 0.375em;

              flex-basis: content;
            `}
          >
            <p
              css={css`
                font-weight: 600;
                line-height: 1.5rem;
              `}
            >
              {title}
            </p>

            <IssueListItemLabelList labels={labels} />
          </div>

          <div>
            <p
              css={css`
                color: gray;
                font-size: 0.75rem;
                line-height: 1.5rem;
              `}
            >
              {new Date(created_at).toLocaleString()}
            </p>
          </div>
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
