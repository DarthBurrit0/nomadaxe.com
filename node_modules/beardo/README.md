[![build status](https://secure.travis-ci.org/jxson/beardo.png)](http://travis-ci.org/jxson/beardo)

# beardo

Provides an easy way to use layout aware mustache templates in your [node.js][node] projects. Add mustache files to a templates directory and use `beardo`'s methods to asynchronously read and render them as appropriate.

If you are using one of the http handlers (`beardo.middleware`, `beardo.handler`) [ETags][etags] get automatically added and 304 responses occur based on the `if-none-match` request header.

# beardo.handler(res, req, [options])

Adds a [Templar][templar] style response handler.

    var beardo = require('beardo')
      , beardopts = { directory: path.join(__dirname, './templates')
        , stamp: 'stamp-' + process.pid
        }

    http.createServer(function(req, res) {
      res.template = beardo.handler(req, res, beardopts)

      // Meanwhile
      res.template('heyo', { foo: 'bar, layout: 'html' })
    })

## Options

* `directory`: The directory that holds the mustache files
* `stamp`: Gets added to the response header as `x-beardo-stamp` to aid in debugging

# LICENSE (MIT)

[node]: http://nodejs.org
[etags]: #
[templar]: #