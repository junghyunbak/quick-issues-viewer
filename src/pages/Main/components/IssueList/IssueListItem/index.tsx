// react
import React, { useCallback, useMemo } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

// components
import { IssueListItemLabelList } from "@/pages/Main/components/IssueList/IssueListItem/IssueListItemLabelList";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";

// svgs
import { ReactComponent as IssueOpened } from "@/assets/svgs/issue-opened.svg";
import { ReactComponent as IssueClosed } from "@/assets/svgs/issue-closed.svg";
import { ReactComponent as Reference } from "@/assets/svgs/reference.svg";
import { ReactComponent as PrOpen } from "@/assets/svgs/pr-open.svg";
import { ReactComponent as PrClosed } from "@/assets/svgs/pr-closed.svg";
import { ReactComponent as PrMerged } from "@/assets/svgs/pr-merged.svg";
import { ReactComponent as Comment } from "@/assets/svgs/comment.svg";

// styles
import { css } from "@emotion/react";
import { color, device, size } from "@/assets/styles";
import "github-markdown-css";

// apis
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
  const {
    id,
    title,
    labels,
    state,
    body,
    user,
    created_at,
    html_url,
    pull_request,
    comments,
  } = issue;

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
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;

          padding: 0.5rem;

          &:hover {
            @media ${device.canHover} {
              background-color: ${color.g100};
            }
          }

          cursor: pointer;
        `}
        onClick={handleIssueItemClick(id)}
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
                font-size: 0.75rem;
                color: gray;
              `}
            >
              {comments}
            </p>
          </div>
        )}
      </div>

      {selectedIssueId === id && (
        <div
          css={css`
            border-top: 1px solid ${color.g200};

            padding: 0.75rem;
          `}
        >
          <FixedAndVariableLayout
            fixedElement={
              <a
                css={css`
                  display: block;

                  width: 2.5rem;
                  height: 2.5rem;

                  border-radius: 9999px;
                  border: 1px solid ${color.g200};

                  overflow: hidden;

                  @media ${device.mobile} {
                    display: none;
                  }
                `}
                target="__blank"
                href={user?.html_url}
              >
                <img
                  src={user?.avatar_url}
                  css={css`
                    width: 100%;
                    height: 100%;
                  `}
                  alt="issue-writer-profile"
                />
              </a>
            }
            variableElement={
              <div
                css={css`
                  padding-left: 1rem;

                  @media ${device.mobile} {
                    padding-left: 0;
                  }
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;

                      background-color: ${color.g100};

                      padding: 0.5rem 0.75rem;

                      border: 1px solid ${color.g200};
                      border-top-left-radius: ${size.BORDER_RADIUS}px;
                      border-top-right-radius: ${size.BORDER_RADIUS}px;

                      position: relative;

                      &::before {
                        content: " ";

                        display: block;

                        position: absolute;
                        top: 0.6875rem;
                        left: -0.5rem;

                        width: 0.5rem;
                        height: 1rem;

                        clip-path: polygon(0 50%, 100% 0, 100% 100%);

                        background-color: ${color.g200};
                      }

                      &::after {
                        content: " ";

                        display: block;

                        position: absolute;
                        top: 0.6875rem;
                        left: -0.5rem;

                        margin-left: 0.125rem;

                        width: 0.5rem;
                        height: 1rem;

                        clip-path: polygon(0 50%, 100% 0, 100% 100%);

                        background-color: ${color.g100};
                      }

                      @media ${device.mobile} {
                        &::before,
                        &::after {
                          display: none;
                        }
                      }
                    `}
                  >
                    <a
                      css={css`
                        font-size: 0.875rem;
                        font-weight: 600;

                        color: ${color.b};
                        text-decoration: none;

                        &:hover {
                          color: ${color.active};
                          text-decoration: underline;
                        }
                      `}
                      href={user?.html_url}
                      target="__blank"
                    >
                      {user?.login}
                    </a>

                    <a href={html_url} target="__blank">
                      <Reference />
                    </a>
                  </div>

                  <div
                    css={css`
                      border: 1px solid ${color.g200};
                      border-top: 0;
                      border-bottom-left-radius: ${size.BORDER_RADIUS}px;
                      border-bottom-right-radius: ${size.BORDER_RADIUS}px;

                      padding: 0.75rem;
                    `}
                  >
                    <Markdown
                      css={css`
                        li {
                          list-style: initial;
                        }

                        pre {
                          padding: 0;
                        }
                      `}
                      className="markdown-body"
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        code({ inline, children, className, node, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");

                          return !inline && match ? (
                            <SyntaxHighlighter
                              {...props}
                              PreTag="div"
                              language={match[1]}
                              style={vs}
                              customStyle={{
                                background: "none",
                                border: 0,
                                margin: 0,
                                fontSize: "1rem",
                                lineHeight: "normal",
                              }}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code {...props} className={className}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {body || ""}
                    </Markdown>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      )}
    </li>
  );
}
