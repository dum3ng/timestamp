'use strict';

var express = require('express');

var session = require('express-session');

var app = express();



app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));


app.route('/33',function(req,res){
	res.send('you are here!')
})

	app.get('/:date',function(req,res){
		var d = parseInt(req.params.date,10)
		if(d){
			var time = new Date(d)
			res.json({
				unix:d,
				natural:time.toDateString()
			})
		}else{
			var str = req.params.date
            str  = str.replace(/\%20/g,'')
			var nat = new Date(str)
			if(nat)
				res.json({
					unix:nat.getTime(),
					natural:str,
				})
		}
	});


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});