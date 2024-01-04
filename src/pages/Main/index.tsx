// components
import { IssueList } from "@/pages/Main/components/IssueList";
import { LabelList } from "@/pages/Main/components/LabelList";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";
import { Header } from "./components/Header";

// styles
import { css } from "@emotion/react";
import { size, color, device } from "@/assets/styles";
import { IssueListFilter } from "./components/IssueListFilter";

export function Main() {
  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
      `}
    >
      <FixedAndVariableLayout
        direction="column"
        fixedElement={<Header />}
        variableElement={
          <FixedAndVariableLayout
            fixedElement={
              <div
                css={css`
                  display: flex;

                  width: ${size.SIDEBAR_WIDTH}px;
                  height: 100%;

                  border-right: 1px solid ${color.g200};

                  @media ${device.tablet} {
                    display: none;
                  }
                `}
              >
                <LabelList />
              </div>
            }
            variableElement={
              <div
                css={css`
                  max-width: ${size.BREAKPOINT_PC}px;
                  height: 100%;

                  margin: 0 auto;
                `}
              >
                <IssueListFilter />
                <IssueList />
              </div>
            }
          />
        }
      />
    </div>
  );
}
