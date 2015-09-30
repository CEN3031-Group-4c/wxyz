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
		
		it ('$scope.appendText() should add an text element to a project', inject(function(Projects) {
			var sampleProjectPutData = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'A test project for elements',
				content: 'Please Work!',
				contributers: [],
				elements: []
			});

			// Mock article in scope
			scope.project = sampleProjectPutData;

			scope.textToAppend = 'Content';

			// Set PUT response
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
			
			// Run controller functionality
			scope.appendText();
			$httpBackend.flush();
			
			// Test if element now exists
			expect(scope.project.elements[0].tag).toBe('text');
			expect(scope.project.elements[0].value).toBe('Content');
			// Test URL location to new object
			expect($location.path()).toBe('/projects/' + sampleProjectPutData._id);
		}));
		it ('$scope.appendText() should reset the field textToAppend', inject(function(Projects) {
			var sampleProjectPutData = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'A test project for elements',
				content: 'Please Work!',
				contributers: [],
				elements: []
			});

			// Mock article in scope
			scope.project = sampleProjectPutData;

			

			// Set PUT response
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
			
			// Run controller functionality
			scope.textToAppend = 'Content A';
			scope.appendText();
			
			$httpBackend.flush();
			
			expect(scope.textToAppend).toBe('');
			
			
		}));
		it ('$scope.appendText() should add elements without modifying the current element list', inject(function(Projects) {
			var sampleProjectPutData = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'A test project for elements',
				content: 'Please Work!',
				contributers: [],
				elements: []
			});

			// Mock article in scope
			scope.project = sampleProjectPutData;


			// Set PUT response
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
			scope.textToAppend = 'Content A';
			scope.appendText();
			$httpBackend.flush();
			
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
			scope.textToAppend = 'Content B';
			scope.appendText();
			$httpBackend.flush();
			
			// Test if element now exists
			expect(scope.project.elements[0].tag).toBe('text');
			expect(scope.project.elements[0].value).toBe('Content A');
			expect(scope.project.elements[1].tag).toBe('text');
			expect(scope.project.elements[1].value).toBe('Content B');
		}));
		
		//******************************************
		//			Append Equation
		//******************************************
		it ('$scope.appendEquation() should add an text element to a project', inject(function(Projects) {
			var sampleProjectPutData = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'A test project for elements',
				content: 'Please Work!',
				contributers: [],
				elements: []
			});

			// Mock article in scope
			scope.project = sampleProjectPutData;

			scope.textToAppend = 'Content';

			// Set PUT response
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
			
			// Run controller functionality
			scope.appendEquation();
			$httpBackend.flush();
			
			// Test if element now exists
			expect(scope.project.elements[0].tag).toBe('equation');
			expect(scope.project.elements[0].value).toBe('Content');
			// Test URL location to new object
			expect($location.path()).toBe('/projects/' + sampleProjectPutData._id);
		}));
		it ('$scope.appendEquation() should reset the field textToAppend', inject(function(Projects) {
			var sampleProjectPutData = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'A test project for elements',
				content: 'Please Work!',
				contributers: [],
				elements: []
			});

			// Mock article in scope
			scope.project = sampleProjectPutData;

			

			// Set PUT response
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
			
			// Run controller functionality
			scope.textToAppend = 'Content A';
			scope.appendEquation();
			
			$httpBackend.flush();
			
			expect(scope.textToAppend).toBe('');
			
			
		}));
		it ('$scope.appendEquation() should add elements without modifying the current element list', inject(function(Projects) {
			var sampleProjectPutData = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'A test project for elements',
				content: 'Please Work!',
				contributers: [],
				elements: []
			});

			// Mock article in scope
			scope.project = sampleProjectPutData;


			// Set PUT response
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
			scope.textToAppend = 'Content A';
			scope.appendEquation();
			$httpBackend.flush();
			
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
			scope.textToAppend = 'Content B';
			scope.appendEquation();
			$httpBackend.flush();
			
			// Test if element now exists
			expect(scope.project.elements[0].tag).toBe('equation');
			expect(scope.project.elements[0].value).toBe('Content A');
			expect(scope.project.elements[1].tag).toBe('equation');
			expect(scope.project.elements[1].value).toBe('Content B');
		}));
		
		it ('deleteElement(element) will remove elements from a project ', inject(function(Projects) {
			//Check if we can edit our projects as admins
			var projectA = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'Project A',
				contributers: []
				
			});
			scope.project = projectA;
			
			var elementA = {tag: 'text', value: 'A', isEditing: false};
			var elementB = {tag: 'equation', value: 'B', isEditing: false};
			var elementC = {tag: 'image', value: 'C', isEditing: false};
			var elementD = {tag: 'video', value: 'D', isEditing: false};
			scope.project.elements = [elementA, elementB, elementC, elementD];
			
			$httpBackend.expectPUT(/projects\/([0-9a-fA-F]{24})$/).respond();
			
			scope.deleteElement(elementA);
			$httpBackend.flush();
			
			expect(scope.project.elements[0]).toBe(elementB);
			
		}));
		
			
	});
}());
