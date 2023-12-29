import { get } from "./methods/get";

import { Octokit } from "octokit";
import { requestLog } from "@octokit/plugin-request-log";

const MyOctoKit = Octokit.plugin(requestLog);

const octokit = new MyOctoKit({
  log: require("console-log-level")({
    level: "info",
  }),
  throttle: { enabled: false },
});

export const apiSevice = {
  ...get(octokit),
};
