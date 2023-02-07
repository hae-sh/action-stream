import * as core from "@actions/core";
import { shaToCid } from "./shaToCid";

async function run(): Promise<void> {
  try {
    core.debug(JSON.stringify(process.env, null, 2));
    // const sha = core.getInput("sha");
    // const cid = shaToCid(sha);
    // core.setOutput("cid", cid.toString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
