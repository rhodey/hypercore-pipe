#!/usr/bin/env node

var hyperpipe = require('./');
var argv = require('minimist')(process.argv.slice(2));

hyperpipe(argv).then((core) => {
  process.stderr.write("ready.\n");
  delete argv._;

  let opts = Object.assign({}, argv)
  if (argv.rtail === true) {
    opts.start = core.remoteLength
  }

  let stream = core.createReadStream(opts);
  stream.pipe(process.stdout);
})
