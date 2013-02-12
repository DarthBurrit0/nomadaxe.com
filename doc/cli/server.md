
nomad server -- Run the server
==============================

## SYNOPSIS

    nomad server [OPTIONS]

## DESCRIPTION

Serve the opal site

    --host        The host to run the server on, defaults to "localhost"
    --port        The port to run the server on, defaults to "8080"
    --log-level   How verbose would you like the log stream? Defaults to info

## EXAMPLES

Run with defaults

    nomad server

Run with options:

    nomad server --host "127.0.0.1" --port 1337 --log-level debug
