import { Octokit } from "octokit";

export const octokit = new Octokit();

export const getRepoIssueList = async (
  owner: string = "",
  repo: string = "",
  labels: string[] = []
) => {
  const response = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: "all",
    labels: labels.join(","),
  });

  return response.data;
};

export const getRepoIssueLabelList = async (
  owner: string = "",
  repo: string = ""
) => {
  const response = await octokit.rest.issues.listLabelsForRepo({
    owner,
    repo,
  });

  return response.data;
};
