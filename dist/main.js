"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main.ts
var core = __toESM(require("@actions/core"), 1);

// src/shaToCid.ts
var import_cid = require("multiformats/cid");
var import_digest = require("multiformats/hashes/digest");
var shaToCid = (hexDigest) => {
  const buf = Buffer.from(hexDigest, "hex");
  const mh = (0, import_digest.create)(17, buf);
  return import_cid.CID.create(1, 120, mh);
};

// src/main.ts
var import_node_fetch = __toESM(require("node-fetch"), 1);
async function run() {
  try {
    const sha = process.env["GITHUB_SHA"];
    const ref = process.env["GITHUB_REF"];
    if (!sha)
      throw new Error("GITHUB_SHA is not set");
    if (!ref)
      throw new Error("GITHUB_REF is not set");
    const cid = shaToCid(sha);
    const data = {
      cid: { "/": cid.toString() },
      sha,
      ref
    };
    const result = await (0, import_node_fetch.default)(
      "http://api.dice.staging.hae.sh/streams/" + core.getInput("haesh_stream_id"),
      {
        method: "POST",
        headers: {
          [core.getInput("haesh_stream_header_name")]: core.getInput(
            "haesh_stream_header_value"
          ),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    ).then((res) => res.json());
    core.setOutput("result", JSON.stringify(result));
  } catch (error) {
    if (error instanceof Error)
      core.setFailed(error.message);
  }
}
run();
