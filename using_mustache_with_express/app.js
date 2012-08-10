var express = require('express'),
    app = express(),
    mustache_plus = require('./mustache_plus.js');


//app.engine('ejs', engine);
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'jade');
//app.set('view options', {
//    layout: false
//});
app.configure(function () {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.set("views", __dirname + '/views');
    app.set("view options", { layout: false });
    app.engine("html", mustache_plus);
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.get("/", function (req, res) {
    res.render("index.html", {
        view: {
            message: "Hello World!",
            items: ["one", "two", "three"]
        },
        partials: {
            foo: "<h1>{{message}}</h1>",
            bar: "<ul>{{#items}}<li>{{.}}</li>{{/items}}</ul>"
        }
    });
});


app.listen(8125);
console.log('listening to http://localhost:8125');









