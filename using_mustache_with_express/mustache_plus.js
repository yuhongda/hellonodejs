var mustache = require("mustache"),
    fs = require('fs');

var renderFile = module.exports = function (template, options, fn) {
    template = compile(template, options, fn);
    return template(options);

};

function compile(source, options, fn) {
    if (typeof source == 'string') {
        return function (options) {
            options.locals = options.locals || {};
            options.partials = options.partials || {};
            if (options.body) // for express.js > v1.0
                locals.body = options.body;
            return fn(null, mustache.render(fs.readFileSync(source, 'utf8'), options.view, options.partials));
        };
    } else {
        return source;
    }
}