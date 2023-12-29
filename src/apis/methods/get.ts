import { type Octokit } from "octokit";
import { type components } from "@octokit/openapi-types";

import parseLink from "parse-link-header";

declare namespace parseLinkHeader {
  interface Link {
    page: string;
    per_page: string;
  }

  interface Links {
    first?: Link;
    prev?: Link;
    next?: Link;
    last?: Link;
  }
}

const getPageCount = (
  pageLinks: parseLinkHeader.Links | null,
  dataLength: number
) => {
  if (!pageLinks) {
    return dataLength === 0 ? 0 : 1;
  }

  if (
    Object.keys(pageLinks).length === 2 &&
    pageLinks.first &&
    pageLinks.prev
  ) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  } else {
    return 1;
  }
};

export function get(octokit: Octokit) {
  return {
    getRepoIssueList: async (
      owner: string,
      repo: string,
      labels: string[],
      perPage: number,
      page: number
    ): Promise<{
      pageCount: number;
      issues: components["schemas"]["issue"][];
    }> => {
      const response = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        per_page: perPage,
        labels: labels.join(","),
        page,
      });

      const {
        data,
        headers: { link },
      } = response;

      const pageCount = getPageCount(parseLink(link), data.length);

      return { pageCount, issues: data };
    },
    getRepoIssueLabelList: async (owner: string = "", repo: string = "") => {
      let ret: components["schemas"]["label"][] = [];

      let page = 1;

      let issueList: components["schemas"]["label"][];

      do {
        const { data } = await octokit.rest.issues.listLabelsForRepo({
          owner,
          repo,
          per_page: 100,
          page,
        });

        issueList = data;

        ret = [...ret, ...issueList];

        page++;
      } while (issueList.length && page <= 10);

      return ret;
    },
    getRepoList: async (owner: string) => {
      await octokit.rest.users.getByUsername({ username: owner });

      const { data } = await octokit.rest.repos.listForUser({
        username: owner,
      });

      return data;
    },
    getUserList: async (owner: string) => {
      const queries: string[] = [`${owner} in:login`];

      const {
        data: { items },
      } = await octokit.rest.search.users({
        q: queries.join("+"),
        per_page: 5,
      });

      return items;
    },
    getUserInfo: async (
      owner?: string
    ): Promise<components["schemas"]["public-user"] | null> => {
      /**
       * owner가 빈 문자열이거나 주어지지 않을 경우
       * 유저 리스트를 조회하는 api가 요청되기 때문에 null값을 반환하도록 처리
       */
      if (!owner) {
        return null;
      }

      const { data } = await octokit.rest.users.getByUsername({
        username: owner,
      });

      return data;
    },
    getRateLimit: async () => {},
  };
}
