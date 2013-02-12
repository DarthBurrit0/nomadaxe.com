
# Nomad Ax

...

# Development

Try to keep things simple and as modular as possible.

The server uses [node.js][node] and the client uses [browserify][browserify] to bundle up the code in the `browser` directory using `browser/client.js` as the entry point.

## Quick Start

To make the `./bin/nomad` CLI available globally use `npm link` then run the server:

    npm link
    nomad server

This will get you up and running on port 8080, visiting http://localhost:8080 will give you the homepage. From this point you can make changes to files in the `browser` and `public` directories and refresh your browser to see them. Changes made to the server code will require a restart. `CTRL + c` to close the server.

# License

MIT

[node]: http://nodejs.org
[browserify]: http://browserify.org
