var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes');

	var dishRouter = express.Router();

	dishRouter.use(bodyParser.json()); // will automatically support get,put,post,delete

	dishRouter.route('/')
	// .all(function(req, res, next){
	// 	res.writeHead(200, {'Content-Type':'text/plain'});
	// 	next();
	// })
	.get(function(req, res, next){
		// res.end('Will send all dishes to you!');
		//find all dishes in database
		Dishes.find({}, function(err, dish){
			if(err) throw err;
			res.json(dish);
		});
	})
	.post(function(req, res, next){
		// res.end('Will add the dish: '+req.body.name+' with detials:'+
		// 	req.body.description);
		Dishes.create(req.body, function(err, dish){
			if(err) throw err;

			console.log('Dish created!');
			var id = dish._id;
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});

			res.end('Added teh dish with the id: ' + id);
		});
	})
	.delete(function(req, res, next){
		// res.end('Deleting all dishes');
		Dishes.remove({}, function(err, resp){
			if(err) throw err;
			res.json(resp);
		});
	});

	dishRouter.route('/:dishId')
	// .all(function(req, res, next){
	// 	res.writeHead(200, {'Content-Type':'text/plain'});
	// 	next();
	// })
	.get(function(req, res, next){
		// res.end('Will send details of the dish '+req.params.dishId+
		// 	' to you!');
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;
			res.json(dish);
		})
	})
	.put(function(req, res, next){
		// res.write('Updating the dish '+req.params.dishId+'<br/>');
		// res.end('Will update the dish '+req.body.name+
		// 	' with details: '+ req.body.description);
		Dishes.findByIdAndUpdate(req.params.dishId,{
			$set: req.body
		}, {
			new: true
		},function(err, dish){
			if(err) throw err;
			res.json(dish);
		});
	})
	.delete(function(req, res, next){
		// res.end('Deleting dish '+req.params.dishId);
		Dishes.findByIdAndRemove(req.params.dishId, function(err, resp){
			if(err) throw err;
			res.json(resp);
		});
	});

	dishRouter.route('/:dishId/comments')

	.get(function(req, res, next){
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;

			res.json(dish.comments);
		});
	})
	.post(function(req, res, next){
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;

			dish.comments.push(req.body);

			dish.save(function(err, dish){
				if(err) throw err;
				console.log('Updated comments!');

				res.json(dish);
			});
		});
	})
	.delete(function(req, res, next){
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;

			for (var i = dish.comments.length - 1; i >= 0; i--) {
				dish.comments.id(dish.comments[i]._id).remove();
			}

			dish.save(function(err, result){
				if(err) throw err;

				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Deleted all comments!');
			});
		});
	})

	dishRouter.route('/:dishId/comments/:commentsId')

	.get(function(req, res, next){
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;

			res.json(dish.comments.id(req.params.commentsId));
		});
	})
	.put(function(req, res, next){
		//we will delete existing commen and insert the updated 
		//comment as a new comment
		Dishes.findById(req.params.dishId, function(err, dish){
			if(err) throw err;

			dish.comments.id(req.params.commentsId).remove();

			dish.comments.push(req.body);

			dish.save(function(err, dish){
				if(err) throw err;
				console.log('Updated Comments!');
				console.log(dish);

				res.json(dish);
			});
		});
	})
	.delete(function(req, res, next){
		Dishes.findById(req.params.dishId, function(err, dish){

			dish.comments.id(req.params.commentsId).remove();
			
			dish.save(function(err, resp){
				if(err) throw err;

				res.json(resp);
			});
		});
	})
	module.exports = dishRouter;


