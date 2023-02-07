import { CID } from "multiformats/cid";
import { create } from "multiformats/hashes/digest";

/**
 * Converts a git sha1 hash to a CID
 *
 * @param hexDigest {string} - the hex string of the sha1 hash
 * @returns {CID} - the CID
 */
function shaToCid(hexDigest) {
  const buf = Buffer.from(hexDigest, "hex");
  // 0x11 is the code for sha1
  const mh = create(0x11, buf);
  // 0x78 is the code for git-raw
  return CID.create(1, 0x78, mh);
}

const inputSha = process.argv[2];

if (!inputSha) {
  console.log("Usage: node shaToCid.js <sha>");
  process.exit(1);
}

console.log(shaToCid(inputSha).toString());
