// react
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

// styles
import { css } from "@emotion/react";
import { color, device, size, zIndex } from "@/assets/styles";
import "github-markdown-css/github-markdown-light.css";

// svgs
import { ReactComponent as Reference } from "@/assets/svgs/reference.svg";

// components
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";
import { IssueCommentReactions } from "./IssueCommentReactions";

// apis
import { type components } from "@octokit/openapi-types";

interface IssueCommentProps {
  markdownText: string;

  issueUrl: string;

  user: components["schemas"]["nullable-simple-user"];

  reactions?: components["schemas"]["reaction-rollup"];

  isComment?: boolean;
}

export function IssueComment({
  markdownText,
  issueUrl,
  user,
  reactions,
  isComment = true,
}: IssueCommentProps) {
  return (
    <FixedAndVariableLayout
      fixedElement={
        <div
          css={css`
            padding: ${isComment ? "1.25rem 0" : "0 0 1.25rem 0"};
          `}
        >
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
        </div>
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

              position: relative;

              padding: ${isComment ? "1.25rem 0" : "0 0 1.25rem 0"};

              &::before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 1.25rem;

                border-left: 2px solid #d0d7de;
              }
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

              <a href={issueUrl} target="__blank">
                <Reference />
              </a>
            </div>

            <div
              css={css`
                border: 1px solid ${color.g200};
                border-top: 0;
                border-bottom-left-radius: ${size.BORDER_RADIUS}px;
                border-bottom-right-radius: ${size.BORDER_RADIUS}px;

                background-color: ${color.w};

                z-index: ${zIndex.MARKDOWN_BODY};

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

                  a[href*="fn"] {
                    scroll-margin-top: 4rem;
                  }

                  font-size: 1rem;
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
                {markdownText}
              </Markdown>

              {reactions && reactions.total_count > 0 && (
                <div
                  css={css`
                    padding-top: 0.75rem;
                  `}
                >
                  <IssueCommentReactions reactions={reactions} />
                </div>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
}
