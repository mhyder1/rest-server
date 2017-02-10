var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//create comment schema
var commentSchema = new Schema({
	rating: {
		type: Number,
		min:1,
		max:5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
},{
	timestamps: true
});

//create dish schema
var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String
	},
	category: {
		type: String
	},
	label: {
		type: String,
		default: ''
	},
	price: {
		type: Currency,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	comments:[commentSchema]	//sub document comments
},{
	timestamps: true
});

//create model to use schema

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;