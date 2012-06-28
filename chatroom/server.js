var http = require('http'),
    io = require('socket.io'),
    fs = require('fs');

server = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    var output = fs.readFileSync('./index.html', 'utf8');
    response.end(output);
});

server.listen(8080);

var socket = io.listen(server);
socket.on('connection', function (client) {
    client.broadcast({ message: client.sessionId + 'is now available' });
    client.on('message', function (msg) { client.broadcast({ message: client.sessionId + ': ' + msg.message }) });
    client.on('disconnection', function () { client.broadcast({ message: client.sessionId + ' is no longer available.' }) });
});