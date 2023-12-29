import { Octokit } from "octokit";
import { type components } from "@octokit/openapi-types";

export const octokit = new Octokit();

export const getRepoIssueList = async (
  owner: string,
  repo: string,
  label: string,
  perPage: number,
  page: number
) => {
  const queries = [`type:issue`, `repo:${owner}/${repo}`];

  if (label) {
    queries.push(`label:"${label}"`);
  }

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: queries.join("+"),
    per_page: perPage,
    page,
  });

  return data;
};

export const getRepoIssueLabelList = async (
  owner: string = "",
  repo: string = ""
) => {
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
};

export const getRepoList = async (owner: string) => {
  await octokit.rest.users.getByUsername({ username: owner });

  const { data } = await octokit.rest.repos.listForUser({
    username: owner,
  });

  return data;
};

export const getUserList = async (owner: string) => {
  const queries: string[] = [`${owner} in:login`];

  const {
    data: { items },
  } = await octokit.rest.search.users({
    q: queries.join("+"),
    per_page: 5,
  });

  return items;
};

export const getUserInfo = async (
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
};
