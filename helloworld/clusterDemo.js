var http = require('http');
var	cluster = require('cluster');

var server = http.createServer(function(req,res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('hello world!\n');
})

cluster(server).set('workers', 2).use(cluster.reload()).listen(1337);
