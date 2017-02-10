var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json()); // will automatically support get,put,post,delete

promoRouter.route('/')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Will send all promotions to you!');
})
.post(function(req, res, next){
	res.end('Will add the promotion: '+req.body.name+' with detials:'+
		req.body.description);
})
.delete(function(req, res, next){
	res.end('Deleting all promotions');
});//end

promoRouter.route('/:id')
.all(function(req, res, next){
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
})
.get(function(req, res, next){
	res.end('Will send details of the promotion '+req.params.id+
		' to you!');
})
.put(function(req, res, next){
	res.write('Updating the promotion '+req.params.id+'<br/>');
	res.end('Will update the promotion '+req.body.name+
		' with details: '+ req.body.description);
})
.delete(function(req, res, next){
	res.end('Deleting promotion '+req.params.id);
});

module.exports = promoRouter;


