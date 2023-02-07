import { shaToCid } from "./shaToCid";
import fetch from "node-fetch";

const requiredEnvKeys = [
  "GITHUB_REF",
  "GITHUB_SHA",
  "GITHUB_ACTION_REPOSITORY",
  "GITHUB_ACTION_REF",
  "INPUT_HAESH_STREAM_ID",
  "INPUT_HAESH_STREAM_HEADER_NAME",
  "INPUT_HAESH_STREAM_HEADER_VALUE",
] as const;

const isCompleteEnv = (
  env: NodeJS.ProcessEnv
): env is NodeJS.ProcessEnv & Record<typeof requiredEnvKeys[number], string> =>
  Object.entries(env).every(
    ([key, value]) => !requiredEnvKeys.includes(key as any) || value
  );

async function run(): Promise<void> {
  try {
    if (!isCompleteEnv(process.env))
      throw new Error("Environment variables are missing");

    const {
      GITHUB_REF: ref,
      GITHUB_SHA: sha,
      INPUT_HAESH_STREAM_HEADER_NAME: streamHeaderName,
      INPUT_HAESH_STREAM_HEADER_VALUE: streamHeaderValue,
      INPUT_HAESH_STREAM_ID: streamId,
      GITHUB_ACTION_REPOSITORY: actionRepository,
      GITHUB_ACTION_REF: actionRef,
    } = process.env;

    const cid = shaToCid(sha).toString();

    const data = {
      git: { cid, sha, ref },
      haesh: { actionRef, actionRepository },
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
