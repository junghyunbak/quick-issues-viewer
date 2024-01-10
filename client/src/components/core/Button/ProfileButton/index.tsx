// styles
import { css } from "@emotion/react";
import { color, size } from "@/assets/styles";

// svgs
import { ReactComponent as User } from "@/assets/svgs/user.svg";

interface ProfileButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function ProfileButton(props: ProfileButtonProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;

        width: 2rem;
        height: 2rem;

        background-color: ${color.g100};
        border: 1px solid ${color.g200};
        border-radius: ${size.BORDER_RADIUS}px;

        cursor: pointer;
      `}
      {...props}
    >
      <User />
    </div>
  );
}
