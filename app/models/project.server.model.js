'use strict';

/*
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/*
 * Project Schema dependencies
 */

var ReportSchema = new Schema({
	quizTitle: String,
	question: String,
	selectedAnswers: [String],
	correctAnswers: [String],
	isCorrect: Boolean,
	student: String
});

var GraphSchema = new Schema({
	x: String,
	y: Number

});

 var QuestionSchema = new Schema({
	tag: {
		type: String,
		enum: ['trueFalse', 'multipleChoice', 'multipleSelection'],
		default: 'multipleChoice'
	},
	explanation : {						//explanation for a question
		type:  String,
		default: ''
	},
	query : { 						//query for a question
		type: String,
		default: ''
	},
	choices : [String],				// all the different answer choices
	answers : [String],				// correct answers
	result: Boolean,				//boolean of correct/incorrect
	answered: Boolean,				//has the user answered the question
	responses: [String],			//list of user's responses
	checked: Boolean,				//answer has been clicked
	feedback: [String]				//list of professor feedback
});

// Element Schema has a GraphSchema dependency
var ElementSchema = new Schema({
	tag: {
		type: String,
		enum: ['text', 'image', 'audio', 'video', 'equation', 'graph', 'linkButton', 'table'],
		default: 'text'
	},
	heading : {						//heading for a text element
		type: String,
		default: 'DEFAULT HEADING',
		trim: true
	},
	value : {						//content for a text element
		type:  String,
		default: 'DEFAULT VALUE'
	},
	imageURL : { 						//an image
		type: String
	},
	isEditing : {						//for in line edits
		type: Boolean,
		default: false
	},
	index : {
		type: Number
		//default: 10
	},
	isEmbedded : {
		type: Boolean,    //for determining if media content was uploaded or embedded
		default: false
	},
	y_name: {
		type: String,
		default: 'Y-Axis'
	},
	x_name: {
		type: String,
		default: 'X-Axis'
	},
	graphType: {
		type: String,
		default: 'ColumnChart'
	},
	dataTitle:{
		type: String,
		default: 'Data'
	},
	graph_points : [GraphSchema],
	showMedia: {
		type: Boolean,
		default: false
	}
});

/*
 * Project Schema
 */

var ProjectSchema = new Schema({
	//_id: Schema.ObjectId,
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Project title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	viewPermission: {
		type: String,
		enum: ['public', 'private'],
		default: 'public',
		trim: true
	},
	editPermission: {
		type: String,
		enum: ['public', 'private'],
		default: 'public',
		trim: true
	},
	viewContributers: [String],
	editContributers: [String],
	elements: [ElementSchema],
	questions: [QuestionSchema],
	children: [ProjectSchema],
	contributers: [String],
	parent: Schema.ObjectId,
	level: {
		type: Number
	},
	reports: [ReportSchema],
	isQuiz: {
		type: Boolean,
		default: false
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Project', ProjectSchema);
mongoose.model('Element', ElementSchema);
mongoose.model('Question', QuestionSchema);
mongoose.model('Report', ReportSchema);
