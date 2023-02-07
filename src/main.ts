import * as core from "@actions/core";
import { shaToCid } from "./shaToCid";
import fetch from "node-fetch";

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

    const result = await fetch(
      "http://api.dice.staging.hae.sh/streams/" +
        core.getInput("haesh_stream_id"),
      {
        method: "POST",
        headers: {
          [core.getInput("haesh_stream_header_name")]: core.getInput(
            "haesh_stream_header_value"
          ),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

    core.setOutput("result", JSON.stringify(result));
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
