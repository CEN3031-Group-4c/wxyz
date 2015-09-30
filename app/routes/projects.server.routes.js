'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	projects = require('../../app/controllers/projects.server.controller');

module.exports = function(app) {
	// Project Routes
	app.route('/projects')
		.get(projects.list)
		.post(users.requiresLogin, projects.create);
		
	app.route('/projects/add-image/:projectId')
		.get(projects.read)
		.put(users.requiresLogin, projects.hasAuthorization, projects.addImage);
		
	app.route('/projects/:projectId')
		.get(projects.read)
		.put(users.requiresLogin, projects.update)
		.delete(users.requiresLogin, projects.hasAuthorization, projects.delete);
	app.route('/public/uploads')
		.post(projects.addImage);
		
	// Finish by binding the article middleware
	app.param('projectId', projects.projectByID);
};
