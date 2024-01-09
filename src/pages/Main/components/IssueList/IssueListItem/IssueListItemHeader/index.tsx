// react
import { useCallback, useMemo, useContext } from "react";
import { IssueContext } from "../index.context";
import { IssueSelectionStateContext } from "../../index.context";

// components
import { IssueListItemHeaderLabelList } from "./IssueListItemHeaderLabelList";

// svgs
import { ReactComponent as Comment } from "@/assets/svgs/comment.svg";
import { ReactComponent as IssueOpened } from "@/assets/svgs/issue-opened.svg";
import { ReactComponent as IssueClosed } from "@/assets/svgs/issue-closed.svg";
import { ReactComponent as PrOpen } from "@/assets/svgs/pr-open.svg";
import { ReactComponent as PrClosed } from "@/assets/svgs/pr-closed.svg";
import { ReactComponent as PrMerged } from "@/assets/svgs/pr-merged.svg";

// styles
import { css } from "@emotion/react";
import { color, device, zIndex } from "@/assets/styles";

export function IssueListItemHeader() {
  const { id, state, title, comments, created_at, pull_request } =
    useContext(IssueContext);

  const { setSelectedIssueId } = useContext(IssueSelectionStateContext);

  const handleIssueItemClick = useCallback(() => {
    setSelectedIssueId((prev) => {
      if (prev === id) {
        return null;
      }

      return id;
    });
  }, [id, setSelectedIssueId]);

  const StatusIcon = useMemo<React.ReactNode>(() => {
    if (pull_request) {
      if (state === "open") {
        return (
          <PrOpen
            css={css`
              path {
                fill: ${color.success};
              }
            `}
          />
        );
      } else {
        if (!pull_request.merged_at) {
          return (
            <PrClosed
              css={css`
                path {
                  fill: rgb(207, 34, 46);
                }
              `}
            />
          );
        } else {
          return (
            <PrMerged
              css={css`
                path {
                  fill: ${color.complete};
                }
              `}
            />
          );
        }
      }
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
    <div
      css={css`
        display: flex;
        justify-content: space-between;

        padding: 0.5rem;

        position: sticky;
        top: 0;
        background-color: ${color.w};
        z-index: ${zIndex.ISSUE_ITEM_HEADER};

        border-bottom: 1px solid ${color.g200};

        &:hover {
          @media ${device.canHover} {
            background-color: ${color.g100};
          }
        }

        cursor: pointer;
      `}
      onClick={handleIssueItemClick}
    >
      <div
        css={css`
          display: flex;

          gap: 0.5rem;
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

            <IssueListItemHeaderLabelList />
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

      {comments > 0 && (
        <div
          css={css`
            display: flex;
            align-items: top;
            gap: 0.2rem;

            padding-right: 0.25rem;
          `}
        >
          <Comment
            css={css`
              path {
                fill: gray;
              }
            `}
          />

          <p
            css={css`
              white-space: nowrap;
              font-size: 0.75rem;
              color: gray;
            `}
          >
            {comments}
          </p>
        </div>
      )}
    </div>
  );
}
