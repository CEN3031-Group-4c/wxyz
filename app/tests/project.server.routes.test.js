'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Project = mongoose.model('Project'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, project;

/**
 * Project routes tests
 */
describe('Project CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new project
		user.save(function() {
			project = {
				title: 'Project Title',
				content: 'Project Content'
			};

			done();
		});
	});

	it('should be able to save an project if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new project
				agent.post('/projects')
					.send(project)
					.expect(200)
					.end(function(projectSaveErr, projectSaveRes) {
						// Handle project save error
						if (projectSaveErr) done(projectSaveErr);

						// Get a list of projects
						agent.get('/projects')
							.end(function(projectsGetErr, projectsGetRes) {
								// Handle project save error
								if (projectsGetErr) done(projectsGetErr);

								// Get projects list
								var projects = projectsGetRes.body;

								// Set assertions
								(projects[0].user._id).should.equal(userId);
								(projects[0].title).should.match('Project Title');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save an project if not logged in', function(done) {
		agent.post('/projects')
			.send(project)
			.expect(401)
			.end(function(projectSaveErr, projectSaveRes) {
				// Call the assertion callback
				done(projectSaveErr);
			});
	});

	it('should not be able to save an project if no title is provided', function(done) {
		// Invalidate title field
		project.title = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new project
				agent.post('/projects')
					.send(project)
					.expect(400)
					.end(function(projectSaveErr, projectSaveRes) {
						// Set message assertion
						(projectSaveRes.body.message).should.match('Title cannot be blank');
						
						// Handle project save error
						done(projectSaveErr);
					});
			});
	});

	it('should be able to update an project if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new project
				agent.post('/projects')
					.send(project)
					.expect(200)
					.end(function(projectSaveErr, projectSaveRes) {
						// Handle project save error
						if (projectSaveErr) done(projectSaveErr);

						// Update project title
						project.title = 'WHY YOU GOTTA BE SO MEAN?';

						// Update an existing project
						agent.put('/projects/' + projectSaveRes.body._id)
							.send(project)
							.expect(200)
							.end(function(projectUpdateErr, projectUpdateRes) {
								// Handle project update error
								if (projectUpdateErr) done(projectUpdateErr);

								// Set assertions
								(projectUpdateRes.body._id).should.equal(projectSaveRes.body._id);
								(projectUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of projects if not signed in', function(done) {
		// Create new project model instance
		var projectObj = new Project(project);

		// Save the project
		projectObj.save(function() {
			// Request projects
			request(app).get('/projects')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single project if not signed in', function(done) {
		// Create new project model instance
		var projectObj = new Project(project);

		// Save the project
		projectObj.save(function() {
			request(app).get('/projects/' + projectObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('title', project.title);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should return proper error for single project which doesnt exist, if not signed in', function(done) {
		request(app).get('/projects/test')
			.end(function(req, res) {
				// Set assertion
				res.body.should.be.an.Object.with.property('message', 'Project is invalid');

				// Call the assertion callback
				done();
			});
	});

	it('should be able to delete an project if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new project
				agent.post('/projects')
					.send(project)
					.expect(200)
					.end(function(projectSaveErr, projectSaveRes) {
						// Handle project save error
						if (projectSaveErr) done(projectSaveErr);

						// Delete an existing project
						agent.delete('/projects/' + projectSaveRes.body._id)
							.send(project)
							.expect(200)
							.end(function(projectDeleteErr, projectDeleteRes) {
								// Handle project error error
								if (projectDeleteErr) done(projectDeleteErr);

								// Set assertions
								(projectDeleteRes.body._id).should.equal(projectSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete an project if not signed in', function(done) {
		// Set project user 
		project.user = user;

		// Create new project model instance
		var projectObj = new Project(project);

		// Save the project
		projectObj.save(function() {
			// Try deleting project
			request(app).delete('/projects/' + projectObj._id)
			.expect(401)
			.end(function(projectDeleteErr, projectDeleteRes) {
				// Set message assertion
				(projectDeleteRes.body.message).should.match('User is not logged in');

				// Handle project error error
				done(projectDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Project.remove().exec();
		done();
	});
});
