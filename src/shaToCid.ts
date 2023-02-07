import { CID } from "multiformats/cid";
import { create } from "multiformats/hashes/digest";

/**
 * Converts a git sha1 hash to a CID
 *
 * @param hexDigest the git commit sha1 string in hex
 * @returns the CID
 */
export const shaToCid = (hexDigest: string) => {
  const buf = Buffer.from(hexDigest, "hex");
  // 0x11 is the code for sha1
  const mh = create(0x11, buf);
  // 0x78 is the code for git-raw
  return CID.create(1, 0x78, mh);
};
