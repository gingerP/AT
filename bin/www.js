#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('../app');
var debug = require('debug')('BikeMagazine:server');
var fs;
var port;
var properties = require("../properties.json");
var server;
var transport;
var transportOptions;
var isSecured = properties.ssl && properties.ssl.enabled;

//HTTPS
if (isSecured) {
    fs = require("fs");
    transport = require('https');
    transportOptions = {
        key: fs.readFileSync(properties.ssl.certDir + '/server.key'),
        cert: fs.readFileSync(properties.ssl.certDir + '/server.crt')
    };
    port = normalizePort(properties.httpsPort || '8443');
    app.set('port', port);
    server = transport.createServer(transportOptions, app);
    server.listen(properties.httpsPort, properties.host, function () {
        console.log('%s: Node server started on %s:%d ...',
            Date(Date.now()), properties.host, properties.httpsPort);
    });
    console.log('%s: HTTPS server successfully created.', Date(Date.now()));
} else {

//HTTP
    transport = require("http");
    port = normalizePort(properties.httpPort || '8080');
    server = transport.createServer(app);
    server.listen(properties.httpPort, properties.host, function () {
        console.log('%s: Node server started on %s:%d ...',
            Date(Date.now()), properties.host, properties.httpPort);
    });
    console.log('%s: HTTP server successfully created.', Date(Date.now()));
}


server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
