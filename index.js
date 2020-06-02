var ram = require('random-access-memory');
var hypercore = require('hypercore');
var swarm = require('hyperdiscovery');

module.exports = function (argv) {
  var inkey = argv._[0].split('dat://')[1];
  var port = argv.port ? argv.port : 3282;

  return new Promise((res, rej) => {
    process.stderr.write("initializing hypercore...\n");
    var opts = { valueEncoding : 'binary', sparse : true };
    var core = hypercore((fname) => ram(), inkey, opts);
    core.once('ready', () => res(core));
    core.once('error', (err) => { core.close(); rej(err) });
  }).then((core) => new Promise((res, rej) => {
    process.stderr.write("discovering peers...\n");
    var opts = { live : true, upload : true, download : true, port };
    var sw = swarm(core, opts);
    sw.once('connection', (peer, type) => res(core));
    sw.once('error', (err) => { sw.close(); rej(err) });
    sw.once('close', () => core.close());
    core.once('close', () => sw.close());
  }))
}
