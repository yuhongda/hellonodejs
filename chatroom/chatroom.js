var http = require('http'),
    io = require('socket.io'),
    fs = require('fs');

server = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    var output = fs.readFileSync('./index.html', 'utf8');
    response.end(output);
});

server.listen(8088);

var socket = io.listen(server);
socket.on('connection', function (client) {
    client.broadcast.emit('message',{ message: client.id + ' is now available' });
    client.on('message', function (msg) { 
		console.log(msg.message+'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
		client.broadcast.emit('message',{ message: client.id + ': ' + msg.message });
	});
	client.on('announce1',function(anno){
		client.broadcast.emit('announce',{message: anno.announcement });
	});
    client.on('disconnect', function () { client.broadcast.emit('message',{ message: client.id + ' is no longer available.' }) });
});