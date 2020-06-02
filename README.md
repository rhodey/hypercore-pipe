# hypercore-pipe
Use [hypercores](https://www.npmjs.com/package/hypercore) from the command line, peer discovery via [hyperdiscovery](https://www.npmjs.com/package/hyperdiscovery).

## usage
Argument `--port` defaults to `3282`, while all other arguments are passed through as options to [feed.createReadStream()](https://www.npmjs.com/package/hypercore#var-stream--feedcreatereadstreamoptions).
```
$ npm install -g hypercore-pipe
$ hypercore-pipe dat://bceaaedf41a894a0048a6e52e0a6806a1f23e7fe30d1f582cabd0c23ed466304 \
    --timeout 60000 --live --rtail | \
      play -t raw -b 16 -e signed -r 8k -c 1 -
```
