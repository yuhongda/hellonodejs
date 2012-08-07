var htutil = require('./htutil'),
	math = require('./math'),
	express = require('express'),
    jade = require('jade'),
    engine = require('ejs-locals'),
    mongo = require('mongodb');

var DB = mongo.Db,
    Connection = mongo.Connection,
    Server = mongo.Server,
    BSON = mongo.BSONNative;
	
var app = express.createServer(
	express.logger()
);

app.engine('ejs', engine);
//app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
//app.set('view options', {
//    layout: false
//});

app.configure(function(){
	app.use(app.router);
	app.use(express.static('./filez'));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
    }));
	app.use(express.methodOverride());
	app.use(express.bodyParser());
});

app.get('/', function (req, res) {
    res.render('home.ejs', { title: "Math Wizard" });
});
app.get('/mult', htutil.loadParams, function(req, res){
	if(req.a && req.b) req.result = req.a * req.b;
	res.render('mult.ejs', { title: "Math Wizard", req: req });
});
app.get('/square', htutil.loadParams, function(req, res){
	if(req.a) req.result = req.a * req.a;
	res.render('square.ejs', { title: "Math Wizard", req: req });
});
app.get('/fibonacci', htutil.loadParams, function(req, res){
	if(req.a) {
		math.fibonacciAsync(Math.floor(req.a), function(val){
			req.result = val;
			res.render('fibo.ejs', { title: "Math Wizard", req: req });
		});
	} else {
	    res.render('fibo.ejs', { title: "Math Wizard", req: req });
	}
});
app.get('/factorial', htutil.loadParams, function(req, res){
	if(req.a) req.result = math.factorial(Math.floor(req.a));
	res.render('factorial.ejs', { title: "Math Wizard", req: req });
});
app.get('/404', function(req, res){
	res.send('NOT Found ' + req.url);
});

//mongoDB test
app.get('/mongodbTest', function (req, res) {
    var db = new DB('test', new Server('localhost', Connection.DEFAULT_PORT, {}), { native_parser: false }),
        results = [];
    db.open(function (err, db) {
        db.collection('product', function (err, collection) {
            collection.find(function (err, cursor) {
                cursor.each(function (err, item) {
                    if (item != null)
                        results.push({ name: item.name });
                    else
                        res.render('mongodb.ejs', { products: results });
                });
            });
        });
    });
});

app.listen(8124);
console.log('listening to http://localhost:8124');









