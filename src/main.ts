import { shaToCid } from "./shaToCid";
import fetch from "node-fetch";

async function run(): Promise<void> {
  try {
    const sha = process.env["GITHUB_SHA"];
    const ref = process.env["GITHUB_REF"];
    const streamId = process.env["INPUT_HAESH_STREAM_ID"];
    const streamHeaderName = process.env["INPUT_HAESH_STREAM_HEADER_NAME"];
    const streamHeaderValue = process.env["INPUT_HAESH_STREAM_HEADER_VALUE"];

    if (!sha) throw new Error("GITHUB_SHA is not set");
    if (!ref) throw new Error("GITHUB_REF is not set");
    if (!streamId) throw new Error("HAESH_STREAM_ID is not set");
    if (!streamHeaderName)
      throw new Error("HAESH_STREAM_HEADER_NAME is not set");
    if (!streamHeaderValue)
      throw new Error("HAESH_STREAM_HEADER_VALUE is not set");

    const cid = shaToCid(sha);

    const data = {
      cid: { "/": cid },
      sha,
      ref,
    } as const;

    const result = await fetch(
      "https://api.dice.staging.hae.sh/streams/" + streamId,
      {
        method: "POST",
        headers: {
          [streamHeaderName]: streamHeaderValue,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());

    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      process.stderr.write(error.message);
      process.exit(1);
    }
  }
}

run();
