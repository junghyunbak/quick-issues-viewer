// react
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

// styles
import * as S from "./index.styles";

export function RepositoryLink() {
  const { owner, repo } = useParams();

  return (
    <Fragment>
      <Helmet>
        <title>Github Issues Viewer - {`${repo} (${owner})`}</title>
      </Helmet>

      <S.Layout>
        <S.LinkAnchor href={`https://github.com/${owner}`} target="__blank">
          {owner}
        </S.LinkAnchor>

        <span>/</span>

        <S.LinkAnchor
          href={`https://github.com/${owner}/${repo}/issues`}
          target="__blank"
        >
          {repo}
        </S.LinkAnchor>
      </S.Layout>
    </Fragment>
  );
}
