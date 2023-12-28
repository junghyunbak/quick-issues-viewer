// react
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// styles
import { ClassNames } from "@emotion/react";
import { color, device, size } from "@/assets/styles";

// utils
import queryString from "query-string";

interface IssueListPaginateProps {
  pageCount: number;
}

export function IssueListPaginate({ pageCount }: IssueListPaginateProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { page } = queryString.parse(searchParams.toString());

  const handlePageClick = useCallback<
    Required<ReactPaginateProps>["onPageChange"]
  >(
    (selectedItem): void => {
      setSearchParams((prev) => {
        return {
          ...prev,
          page: selectedItem.selected + 1,
        };
      });
    },
    [setSearchParams]
  );

  const initialPage = useMemo(() => {
    if (page === undefined) {
      return undefined;
    }

    if (isNaN(Number(page))) {
      return undefined;
    }

    return Number(page) - 1;
  }, [page]);

  return (
    <ClassNames>
      {({ css }) => {
        return (
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            initialPage={initialPage}
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.125rem;

              @media ${device.mobile} {
                justify-content: space-around;
              }
            `}
            pageClassName={css`
              border-radius: ${size.BORDER_RADIUS}px;

              overflow: hidden;
            `}
            pageLinkClassName={css`
              display: flex;
              align-items: center;
              justify-content: center;

              padding: 0.5rem 0.8rem;

              cursor: pointer;

              font-size: 0.875rem;

              @media ${device.mobile} {
                display: none;
              }
            `}
            activeClassName={css`
              color: ${color.w};

              background-color: ${color.active};
            `}
            breakClassName={css`
              @media ${device.mobile} {
                display: none;
              }
            `}
            previousLinkClassName={css`
              padding: 0.3125rem 0.625rem;

              display: flex;
              align-items: center;

              font-size: 0.875rem;

              color: ${color.active};

              cursor: pointer;

              &::before {
                content: "";

                width: 1rem;
                height: 1rem;

                clip-path: polygon(
                  9.8px 12.8px,
                  8.7px 12.8px,
                  4.5px 8.5px,
                  4.5px 7.5px,
                  8.7px 3.2px,
                  9.8px 4.3px,
                  6.1px 8px,
                  9.8px 11.7px,
                  9.8px 12.8px
                );

                background-color: ${color.active};
              }
            `}
            nextLinkClassName={css`
              padding: 0.3125rem 0.625rem;

              display: flex;
              align-items: center;

              font-size: 0.875rem;

              cursor: pointer;

              color: ${color.active};

              &::after {
                content: "";

                width: 1rem;
                height: 1rem;

                clip-path: polygon(
                  6.2px 3.2px,
                  7.3px 3.2px,
                  11.5px 7.5px,
                  11.5px 8.5px,
                  7.3px 12.8px,
                  6.2px 11.7px,
                  9.9px 8px,
                  6.2px 4.3px,
                  6.2px 3.2px
                );

                background-color: ${color.active};
              }
            `}
            disabledClassName={css`
              a {
                color: ${color.inactive};

                &::after,
                &::before {
                  background-color: ${color.inactive};
                }
              }
            `}
          />
        );
      }}
    </ClassNames>
  );
}
