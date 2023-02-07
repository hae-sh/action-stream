import * as core from "@actions/core";
import { shaToCid } from "./shaToCid";
import axios from "axios";

async function run(): Promise<void> {
  try {
    const sha = process.env["GITHUB_SHA"];
    const ref = process.env["GITHUB_REF"];

    if (!sha) throw new Error("GITHUB_SHA is not set");
    if (!ref) throw new Error("GITHUB_REF is not set");

    const cid = shaToCid(sha);

    const data = {
      cid: { "/": cid.toString() },
      sha,
      ref,
    } as const;

    const result = await axios.post(
      "http://api.dice.staging.hae.sh/streams/" +
        core.getInput("haesh_stream_id"),
      data,
      {
        headers: {
          [core.getInput("haesh_stream_header_name")]: core.getInput(
            "haesh_stream_header_value"
          ),
          "Content-Type": "application/json",
        },
      }
    );

    core.setOutput("result", JSON.stringify(result.data));
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
