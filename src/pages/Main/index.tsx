// components
import { IssueList } from "@/pages/Main/components/IssueList";
import { LabelList } from "@/pages/Main/components/LabelList";
import { Header } from "@/components/widgets/Header";
import { FixedAndVariableLayout } from "@/components/Layout/FixedAndVariableLayout";

// styles
import { css } from "@emotion/react";
import { size, color, device } from "@/assets/styles";

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
                  display: none;

                  @media ${device.pc} {
                    display: block;
                  }

                  width: ${size.SIDEBAR_WIDTH}px;
                  height: 100%;

                  border-right: 1px solid ${color.g200};

                  overflow: auto;
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
                <IssueList />
              </div>
            }
          />
        }
      />
    </div>
  );
}
