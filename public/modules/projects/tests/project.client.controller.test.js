'use strict';

(function() {
	// Articles Controller Spec
	describe('ProjectsController', function() {
		// Initialize global variables
		var ProjectController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Projects controller.
			ProjectController = $controller('ProjectsController', {
				$scope: scope
			});
			
			scope.authentication.user = {
					_id: '5500abb9d21dec690fc66fe6',
					firstName: 'Han',
					lastName: 'Solo',
					email: 'test@test.com',
					isAdmin: true,
				};
		}));

		describe('Tests .create()', function(){
	        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
	            // Set a new global scope
	            scope = $rootScope.$new();

	            // Point global variables to injected services
	            $stateParams = _$stateParams_;
	            $httpBackend = _$httpBackend_;
	            $location = _$location_;
				ProjectController = $controller('ProjectsController', {
					$scope: scope
				});
				
				// Fixture mock form input values
				scope.title = 'A Test Project';
				scope.content = 'used for testing!';
	        }));
	        it('resets the title and content forms', inject(function(Projects) {
				// Set POST response
				var sampleProjectPostData = new Projects({
						title: 'A Test Project',
						content: 'used for testing!',
						contributers: ['5500abb9d21dec690fc66fe6'],
						level: 1
				});
				var sampleProjectResponse = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'A Test Project',
					content: 'used for testing!',
					//contributers: ['5500abb9d21dec690fc66fe6'],
					level: 1
				});
				$httpBackend.expectPOST('projects', sampleProjectPostData).respond(sampleProjectResponse);

				// Run controller functionality
				scope.create_project();
				$httpBackend.flush();

				// Test form inputs are reset
				expect(scope.title).toEqual('');
				expect(scope.content).toEqual('');
			}));
			it('changes location to projects/<project_id>', inject(function(Projects) {
				// Set POST response
				var sampleProjectPostData = new Projects({
						title: 'A Test Project',
						content: 'used for testing!',
						contributers: ['5500abb9d21dec690fc66fe6'],
						level: 1
				});
				var sampleProjectResponse = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'A Test Project',
					content: 'used for testing!',
					//contributers: ['5500abb9d21dec690fc66fe6'],
					level: 1
				});
				$httpBackend.expectPOST('projects', sampleProjectPostData).respond(sampleProjectResponse);

				// Run controller functionality
				scope.create_project();
				$httpBackend.flush();

				// Test URL redirection after the article was created
				expect($location.path()).toBe('/projects/' + sampleProjectResponse._id);
			}));
			it('creates a project with level 1 and adds the current user as a contributor', inject(function(Projects) {
				// Set POST response
				var sampleProjectPostData = new Projects({
						title: 'A Test Project',
						content: 'used for testing!',
						contributers: ['5500abb9d21dec690fc66fe6'],
						level: 1
						
				});
				var sampleProjectResponse = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'A Test Project',
					content: 'used for testing!',
					//contributers: ['5500abb9d21dec690fc66fe6'],
					//level: 1
				});
				$httpBackend.expectPOST('projects', sampleProjectPostData).respond(sampleProjectResponse);

				// Run controller functionality
				scope.create_project();
				$httpBackend.flush();
			}));

		});
	describe('Tests .addLevel()', function(){
	    beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			ProjectController = $controller('ProjectsController', {
				$scope: scope
			});
			
			// Fixture mock form input values
			scope.title = 'A Test Course';
			scope.content = 'under "A Test Project"';
			
		}));
		it('Creates a course if used under a level 1 project and resets all input forms.', inject(function(Projects) {
			// Set POST response
			var currentProject = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [],
					level: 1
			});
			scope.project = currentProject;
			var sampleCoursePostData = new Projects({
					title: 'A Test Course',
					content: 'under "A Test Project"',
					level: 2
			});
			var sampleProjectPut = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [{'title':'A Test Course','content':'under \"A Test Project\"','level':2}],
					level: 1
			});
			var sampleCourseResponse = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'A Test Course',
					content: 'under "A Test Project"',
					contributers: ['5500abb9d21dec690fc66fe6'],
					level: 2
			});
			$httpBackend.expectPUT('projects', sampleProjectPut).respond();
			$httpBackend.expectPOST('projects', sampleCoursePostData).respond(sampleCourseResponse);

			// Run controller functionality
			scope.addLevel(2);
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');
		}));
		
		it('Creates correctly leveled quiz under level 1 project', inject(function(Projects) {
			// Set POST response
			scope.title = 'A Test Quiz';
			var currentProject = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [],
					level: 1
			});
			scope.project = currentProject;
			var sampleQuizPostData = new Projects({
					title: 'A Test Quiz',
					content: 'under "A Test Project"',
					level: 2,
					reports: [],
					isQuiz: true
			});
			var sampleProjectPut = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [{'title':'A Test Quiz','content':'under \"A Test Project\"','level':2, 'reports':[], 'isQuiz':true}],
					level: 1
			});
			var sampleQuizResponse = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'A Test Quiz',
					content: 'under "A Test Project"',
					contributers: ['5500abb9d21dec690fc66fe6'],
					level: 2,
					reports: [],
					isQuiz: true
			});
			$httpBackend.expectPUT('projects', sampleProjectPut).respond();
			$httpBackend.expectPOST('projects', sampleQuizPostData).respond(sampleQuizResponse);

			// Run controller functionality
			scope.addLevel(-1);
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');
		}));
		
		it('Creates correctly leveled courses under non level 1 courses', inject(function(Projects) {
			// Set POST response
			scope.title = 'A Test Quiz';
			var currentProject = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [],
					level: 3
			});
			scope.project = currentProject;
			var sampleCoursePostData = new Projects({
					title: 'A Test Quiz',
					content: 'under "A Test Project"',
					level: 4
			});
			var sampleProjectPut = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [{'title':'A Test Quiz','content':'under \"A Test Project\"','level':4}],
					level: 3
			});
			var sampleCourseResponse = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'A Test Course',
					content: 'under "A Test Project"',
					contributers: ['5500abb9d21dec690fc66fe6'],
					level: 4
			});
			$httpBackend.expectPUT('projects', sampleProjectPut).respond();
			$httpBackend.expectPOST('projects', sampleCoursePostData).respond(sampleCourseResponse);

			// Run controller functionality
			scope.addLevel(4);
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');
		}));
		
		it('Creates correctly leveled quiz under non level 1 courses', inject(function(Projects) {
			// Set POST response
			var currentProject = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [],
					level: 3
			});
			scope.project = currentProject;
			var sampleQuizPostData = new Projects({
					title: 'A Test Course',
					content: 'under "A Test Project"',
					level: 4,
					reports: [],
					isQuiz: true
			});
			var sampleProjectPut = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [{'title':'A Test Course','content':'under \"A Test Project\"','level':4, 'reports':[], 'isQuiz':true}],
					level: 3
			});
			var sampleQuizResponse = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'A Test Quiz',
					content: 'under "A Test Project"',
					contributers: ['5500abb9d21dec690fc66fe6'],
					level: 4,
					reports: [],
					isQuiz: true
			});
			$httpBackend.expectPUT('projects', sampleProjectPut).respond();
			$httpBackend.expectPOST('projects', sampleQuizPostData).respond(sampleQuizResponse);

			// Run controller functionality
			scope.addLevel(-1);
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');
		}));
		
		it('Will not create projects in the wrong level of the heirarchy', inject(function(Projects) {
			// Set POST response
			var currentProject = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [],
					level: 2
			});
			scope.project = currentProject;
			var sampleCoursePostData = new Projects({
					title: 'A Test Course',
					content: 'under "A Test Project"',
					level: 4
			});
			var sampleProjectPut = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [{'title':'A Test Course','content':'under \"A Test Project\"','level':4}],
					level: 2
			});
			var sampleCourseResponse = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'A Test Course',
					content: 'under "A Test Project"',
					contributers: ['5500abb9d21dec690fc66fe6'],
					level: 4
			});
			$httpBackend.expectPUT('projects', sampleProjectPut).respond();
			$httpBackend.expectPOST('projects', sampleCoursePostData).respond(sampleCourseResponse);

			// Run controller functionality
			scope.addLevel(4);
			//$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.project.children).toEqual([]);
			expect(scope.title).toEqual('A Test Course');
			expect(scope.content).toEqual('under "A Test Project"');
		}));
		it('Creates adds projects to the children array without altering other children', inject(function(Projects) {
			// Set POST response
			scope.title = 'A Second Test Course';
			scope.content = 'also under "A Test Project"';
			var currentProject = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [{'title':'A Test Course','content':'under \"A Test Project\"','level':3}],
					level: 2
			});
			scope.project = currentProject;
			var sampleCoursePostData = new Projects({
					title: 'A Second Test Course',
					content: 'also under "A Test Project"',
					level: 3
			});
			var sampleProjectPut = new Projects({
					title: 'A Test Project',
					content: 'used for testing!',
					contributers: ['5500abb9d21dec690fc66fe6'],
					children: [{'title':'A Test Course','content':'under \"A Test Project\"','level':3},{'title':'A Second Test Course','content':'also under \"A Test Project\"','level':3}],
					level: 2
			});
			var sampleCourseResponse = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'A Second Test Course',
					content: 'also under "A Test Project"',
					contributers: ['5500abb9d21dec690fc66fe6'],
					level: 3
			});
			$httpBackend.expectPUT('projects', sampleProjectPut).respond();
			$httpBackend.expectPOST('projects', sampleCoursePostData).respond(sampleCourseResponse);

			// Run controller functionality
			scope.addLevel(3);
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');
		}));
	});
	
	//ALL THE TESTS FOR QUIZZES
	describe('Tests for True/False questions within Quiz', function(){
	    beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			ProjectController = $controller('ProjectsController', {
				$scope: scope
			});
			
		}));
		it('Answering true/false question updates question.responses', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'trueFalse', explanation: 'This is true', query: 'True or false', choices: ['True', 'False'], answers: ['True'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setAnswer('True', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].responses[0]).toBe('True');
		}));
		it('Answering true/false question updates question.answered', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'trueFalse', explanation: 'This is true', query: 'True or false', choices: ['True', 'False'], answers: ['True'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setAnswer('True', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].answered).toBe(false);
		}));
		it('Answering true/false question updates question.checked', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'trueFalse', explanation: 'This is true', query: 'True or false', choices: ['True', 'False'], answers: ['True'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setAnswer('True', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].checked).toBe(true);
		}));
		it('Answering true/false question correctly makes question.result=true', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'trueFalse', explanation: 'This is true', query: 'True or false', choices: ['True', 'False'], answers: ['True'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setAnswer('True', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].result).toBe(true);
		}));
		it('Answering true/false question incorrectly makes question.result=false', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'trueFalse', explanation: 'This is true', query: 'True or false', choices: ['True', 'False'], answers: ['True'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			
			scope.setAnswer('False', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].result).toBe(false);
		}));
	});
	
	describe('Tests for Multiple Choice questions within Quiz', function(){
	    beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			ProjectController = $controller('ProjectsController', {
				$scope: scope
			});
			
		}));
		it('Answering multiple choice question updates question.responses', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleChoice', explanation: 'A is correct', query: 'Select one', choices: ['A', 'B', 'C', 'D'], answers: ['A'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setAnswer('A', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].responses[0]).toBe('A');
		}));
		it('Answering multiple choice question updates question.answered', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleChoice', explanation: 'A is correct', query: 'Select one', choices: ['A', 'B', 'C', 'D'], answers: ['A'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setAnswer('A', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].answered).toBe(false);
		}));
		it('Answering multiple choice question updates question.checked', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleChoice', explanation: 'A is correct', query: 'Select one', choices: ['A', 'B', 'C', 'D'], answers: ['A'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setAnswer('A', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].checked).toBe(true);
		}));
		it('Answering multiple choice question correctly makes question.result=true', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleChoice', explanation: 'A is correct', query: 'Select one', choices: ['A', 'B', 'C', 'D'], answers: ['A'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setAnswer('A', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].result).toBe(true);
		}));
		it('Answering multiple choice question incorrectly makes question.result=false', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleChoice', explanation: 'A is correct', query: 'Select one', choices: ['A', 'B', 'C', 'D'], answers: ['A'], 
												result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setAnswer('B', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].result).toBe(false);
		}));
	});
	
	describe('Tests for Multiple Selection questions within Quiz', function(){
	    beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			ProjectController = $controller('ProjectsController', {
				$scope: scope
			});
			
		}));
		it('Answering multiple selection question with one option updates question.responses', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].responses[0]).toBe('A');
		}));
		it('Answering multiple selection question with multiple options updates question.responses', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('B', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].responses[0]).toBe('A');
			expect(sampleQuiz.questions[0].responses[1]).toBe('B');
		}));
		it('Answering multiple selection question with already used options removes it from question.responses', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('B', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].responses[0]).toBe('B');
		}));
		it('Answering multiple selection question with one option updates question.answered', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].answered).toBe(false);
		}));
		it('Answering multiple selection question with multiple options updates question.answered', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('B', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].answered).toBe(false);
		}));
		it('Answering multiple selection question with one option updates question.checked', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].checked).toBe(true);
		}));
		it('Answering multiple selection question with multiple options updates question.checked', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('B', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].checked).toBe(true);
		}));
		it('Answering multiple selection question with only one correct answer makes question.result=false', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].result).toBe(false);
		}));
		it('Answering multiple selection question with all correct answers makes question.result=true', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('B', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('C', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].result).toBe(true);
		}));
		it('Answering multiple selection question incorrectly makes question.result=false', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('B', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].result).toBe(false);
		}));
		it('Answering multiple selection question with all correct answers and one incorrect answer makes question.result=false', inject(function(Projects) {
			var sampleQuiz = new Projects({
				title: 'Test Quiz',
				level: 2,
				questions: [{tag:'multipleSelection', explanation: 'A, B, C are correct', query: 'Select one or more', choices: ['A', 'B', 'C', 'D'], 
									answers: ['A', 'B', 'C'], result: false, answered: false, responses: [], checked: false, feedback: []}],
				isQuiz: true
			});
			scope.setMultipleAnswer('A', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('B', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('C', sampleQuiz.questions[0]);
			scope.setMultipleAnswer('D', sampleQuiz.questions[0]);
			expect(sampleQuiz.questions[0].result).toBe(false);
		}));
	});
		
		it('$scope.findOne() should create an array with one project object fetched from XHR using a projectId URL parameter', inject(function(Projects) {
			// Define a sample article object
			var sampleProject = new Projects({
				title: 'An Project for testing',
				content: 'I still dont know what im doing'
			});

			// Set the URL parameter
			$stateParams.projectId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/projects\/525a8422f6d0f87f0e407a33/).respond(sampleProject);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.project).toEqualData(sampleProject);
		}));

		

		it('$scope.update() should update a valid project', inject(function(Projects) {
			
			// Define a sample article put data
			var sampleProjectPutData = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'A project to be updated',
				contributers: [],
				content: 'test test test!'
			});

			// Mock article in scope
			scope.project = sampleProjectPutData;

			// Set PUT response
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/projects/' + sampleProjectPutData._id);
		}));
	
		it('$scope.remove() should send a DELETE request with a valid articleId and remove the article from the scope', inject(function(Projects) {
			// Create new article object
			var sampleProject = new Projects({
				_id: '525a8422f6d0f87f0e407a33',
				children: [],
				contributers: []
			});
			scope.project = sampleProject;
			// Create new articles array and include the article
			scope.projects = [sampleProject];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/projects\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove();
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.projects.length).toBe(0);
		})); 
		
		
		
		
			
	});
}());
