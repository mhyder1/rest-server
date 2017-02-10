var express = require('express');
var bodyParser = require('body-parser');

	var leaderRouter = express.Router();

	leaderRouter.use(bodyParser.json()); // will automatically support get,put,post,delete

	leaderRouter.route('/')
	.all(function(req, res, next){
		res.writeHead(200, {'Content-Type':'text/plain'});
		next();
	})
	.get(function(req, res, next){
		res.end('Will send all leaders to you!');
	})
	.post(function(req, res, next){
		res.end('Will add the leader: '+req.body.name+' with detials:'+
			req.body.description);
	})
	.delete(function(req, res, next){
		res.end('Deleting all leaders');
	});//end

	leaderRouter.route('/:id')
	.all(function(req, res, next){
		res.writeHead(200, {'Content-Type':'text/plain'});
		next();
	})
	.get(function(req, res, next){
		res.end('Will send details of the leader '+req.params.id+
			' to you!');
	})
	.put(function(req, res, next){
		res.write('Updating the leader '+req.params.id+'<br/>');
		res.end('Will update the leader '+req.body.name+
			' with details: '+ req.body.description);
	})
	.delete(function(req, res, next){
		res.end('Deleting leader '+req.params.id);
	});

	module.exports = leaderRouter;


