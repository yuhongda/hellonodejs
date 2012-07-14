var htutil = require('./htutil');
exports.get = function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var result = req.a * req.b;
	res.end(
		htutil.page("Multiplication", htutil.navbar(), [
			(!IsNaN(req.a) && !IsNaN(req.b) ? 
				("<p class='result'>{a} * {b} = {result}</p>"
					.replace("{a}", req.a)
					.replace("{b}", req.b)
					.replace("{result}", result))
					: ""),
			"<p>Enter numbers to multiply</p>",
			"<form name='mult' action='/mult' method='get'>",
			"A: <input type='text' name='a' /><br/>",
			"B: <input type='text' name='b' />".
			"<input type='submit' value='Submit' />",
			"</form>"
		].join('\n'));
	);
}