// react
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

// styles
import * as S from "./index.styles";
import "github-markdown-css/github-markdown-light.css";

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
        <S.ProfileBox isComment={isComment}>
          <S.ProfileImageAnchor target="__blank" href={user?.html_url}>
            <S.ProfileImage src={user?.avatar_url} alt="issue-writer-profile" />
          </S.ProfileImageAnchor>
        </S.ProfileBox>
      }
      variableElement={
        <S.ContentLayout isComment={isComment}>
          <S.ContentHeaderBox>
            <S.ContentHeaderUserNameAnchor
              href={user?.html_url}
              target="__blank"
            >
              {user?.login}
            </S.ContentHeaderUserNameAnchor>

            <S.ContentHeaderReferenceAnchor href={issueUrl} target="__blank">
              <S.Reference />
            </S.ContentHeaderReferenceAnchor>
          </S.ContentHeaderBox>

          <S.ContentBodyBox>
            <S.ContentBodyMarkdownWrapper className="markdown-body">
              <Markdown
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
            </S.ContentBodyMarkdownWrapper>

            {reactions && reactions.total_count > 0 && (
              <S.ContentBodyReactionsBox>
                <IssueCommentReactions reactions={reactions} />
              </S.ContentBodyReactionsBox>
            )}
          </S.ContentBodyBox>
        </S.ContentLayout>
      }
    />
  );
}
