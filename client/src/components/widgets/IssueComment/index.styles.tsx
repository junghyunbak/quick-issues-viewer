// styles
import styled from "@emotion/styled";
import { size, color, device, zIndex } from "@/assets/styles";

// svgs
import { ReactComponent as ReferenceIcon } from "@/assets/svgs/reference.svg";

/**
 * profile
 */
export const ProfileBox = styled.div<{ isComment: boolean }>`
  padding: ${(props) => (props.isComment ? "1.25rem 0" : "0 0 1.25rem 0")};
`;

export const ProfileImageAnchor = styled.a`
  display: block;

  width: 2.5rem;
  height: 2.5rem;

  border-radius: 9999px;
  border: 1px solid ${color.g200};

  overflow: hidden;

  @media ${device.mobile} {
    display: none;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

/**
 * content
 */
export const ContentLayout = styled.div<{ isComment: boolean }>`
  display: flex;
  flex-direction: column;

  position: relative;

  padding: ${(props) => (props.isComment ? "1.25rem 0" : "0")};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 1.25rem;

    border-left: 2px solid #d0d7de;
  }

  margin-left: 1rem;

  @media ${device.mobile} {
    margin-left: 0;
  }
`;

export const ContentHeaderBox = styled.div`
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
`;

export const ContentHeaderUserNameAnchor = styled.a`
  font-size: 0.875rem;
  font-weight: 600;

  color: ${color.b};
  text-decoration: none;

  &:hover {
    color: ${color.active};
    text-decoration: underline;
  }
`;

export const ContentHeaderReferenceAnchor = styled.a``;

export const Reference = styled(ReferenceIcon)``;

export const ContentBodyBox = styled.div`
  border: 1px solid ${color.g200};
  border-top: 0;
  border-bottom-left-radius: ${size.BORDER_RADIUS}px;
  border-bottom-right-radius: ${size.BORDER_RADIUS}px;

  background-color: ${color.w};

  z-index: ${zIndex.MARKDOWN_BODY};

  padding: 0.75rem;
`;

export const ContentBodyMarkdownWrapper = styled.div`
  // .markdown-body 스타일 덮어쓰기
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
`;

export const ContentBodyReactionsBox = styled.div`
  padding-top: 0.75rem;
`;
