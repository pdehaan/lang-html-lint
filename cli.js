#!/usr/bin/env node

const lib = require("./lib");

const [, , ...argv] = process.argv;

async function main(args) {
  const res = await lib.lintFiles(args);
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(res, null, 2));
}

main(argv);
