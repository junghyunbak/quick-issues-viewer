// styles
import * as S from "./index.styles";

export function SearchModalFooter() {
  return (
    <S.FooterLayout>
      <S.FooterGuideParagraph>
        <b>owner</b>: change input value / <b>repository</b>: change url path
      </S.FooterGuideParagraph>
    </S.FooterLayout>
  );
}
