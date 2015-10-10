'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Project = mongoose.model('Project'),
	Text = mongoose.model('Element'),
	_ = require('lodash');

/**
 * Create a project
 */
exports.create = function(req, res) {
	console.log('we in create');
	
	var project = new Project(req.body);
	project.user = req.user;

	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(project);
		}
	});
};

/**
 * Show the current project
 */
exports.read = function(req, res) {
	console.log('we are in read');
	res.json(req.project);
};


exports.addImage = function(req, res) {
	console.log('add image');
	console.log(req.files);
    // The correct place to correct the image upload path issue is in
    // wxyz\node_modules\multer\index.js:90 but the node_modules folder
    // is not monitored by git, so I corrected the issue here.
    var newPath = req.files.file.path.replace('\\', '/');
	res.json({data: newPath});
};

/**
 * Update a project
 */
exports.update = function(req, res) {
	console.log('we are in update');
	var project = req.project;

	project = _.extend(project, req.body);
	
	//var text = Project.Text.create({value : 'alex was here'});
	
	//project.texts.push(text);



	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(project);
		}
	});
};

exports.saveImage = function(req, res) {
	console.log('we in save image');
	
	var project = req.project;

	project = _.extend(project, req.body);



	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(project);
		}
	});
};

/**
 * Delete an project
 */
exports.delete = function(req, res) {
	var project = req.project;

	project.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(project);
		}
	});
};

/**
 * List of Projects
 */
exports.list = function(req, res) {
	Project.find().sort('-created').populate('user', 'displayName').exec(function(err, projects) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(projects);
		}
	});
};

/**
 * Project middleware
 */
exports.projectByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Project is invalid'
		});
	}

	Project.findById(id).populate('user', 'displayName').exec(function(err, project) {
		if (err) return next(err);
		if (!project) {
			return res.status(404).send({
  				message: 'Project not found'
  			});
		}
		req.project = project;
		next();
	});
};

/**
 * Project authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (!req.user.isAdmin) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
