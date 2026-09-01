#!/usr/bin/env node
// local-only helper. Not a Vercel function (not under /api). No package.json / no build.
const fs = require("fs");
const path = require("path");
function dec(src, dest, expect) {
  const b64 = fs.readFileSync(src, "utf8").replace(/\s+/g, "");
  const buf = Buffer.from(b64, "base64");
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  console.log(dest, buf.length, buf.slice(0, 3).toString("hex"));
  if (expect && buf.length !== expect) throw new Error(dest + " size " + buf.length + " != " + expect);
}
if (fs.existsSync("og.jpg.b64")) dec("og.jpg.b64", "og.jpg", 31521);
if (fs.existsSync("fonts/fraunces-600.woff2.b64")) dec("fonts/fraunces-600.woff2.b64", "fonts/fraunces-600.woff2", 18096);
if (fs.existsSync("fonts/fraunces-700.woff2.b64")) dec("fonts/fraunces-700.woff2.b64", "fonts/fraunces-700.woff2", 18212);
