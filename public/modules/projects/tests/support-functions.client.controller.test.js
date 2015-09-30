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
		
		it ('$scope.lookup() returns the correct project given a valid id', inject(function(Projects) {
			//Create an array of projects
			var projectA = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'Project A',
			});
			var projectB = new Projects({
				_id: '525cf20451979dea2c000002',
				title: 'Project B',
			});
			var projectC = new Projects({
				_id: '525cf20451979dea2c000003',
				title: 'Project C',
			});
			var projectD = new Projects({
				_id: '525cf20451979dea2c000004',
				title: 'Project D',
			});
			scope.projects = [projectA, projectB, projectC, projectD];

			expect(scope.lookup('525cf20451979dea2c000001')).toBe(projectA);
			expect(scope.lookup('525cf20451979dea2c000003')).toBe(projectC);
			expect(scope.lookup('525cf20451979dea2c000001')).toBe(projectA);
			expect(scope.lookup('525cf20451979dea2c000004')).toBe(projectD);
			
		}));
		
		it ('$scope.lookup() returns false given a bad id', inject(function(Projects) {
			//Create an array of projects
			var projectA = new Projects({
				_id: '525cf20451979dea2c000001',
				title: 'Project A',
			});
			var projectB = new Projects({
				_id: '525cf20451979dea2c000002',
				title: 'Project B',
			});
			var projectC = new Projects({
				_id: '525cf20451979dea2c000003',
				title: 'Project C',
			});
			var projectD = new Projects({
				_id: '525cf20451979dea2c000004',
				title: 'Project D',
			});
			scope.projects = [projectA, projectB, projectC, projectD];

			expect(scope.lookup('525cf20451979dea2c000005')).toBe(false);
			
		}));
		describe('Tests .resolveTop()', function(){
	        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
	            // Set a new global scope
	            scope = $rootScope.$new();

	            // Point global variables to injected services
	            $stateParams = _$stateParams_;
	            $httpBackend = _$httpBackend_;
	            $location = _$location_;

	            // Initialize the Dashboard controller
	           ProjectController = $controller('ProjectsController', {
					$scope: scope
				});
				
				//Initialize a tree of projects
				var projectA = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'Project A'
				});
				var projectB = new Projects({
					_id: '525cf20451979dea2c000002',
					title: 'Project B'
				});
				var projectC = new Projects({
					_id: '525cf20451979dea2c000003',
					title: 'Project C'
				});
				var projectD = new Projects({
					_id: '525cf20451979dea2c000004',
					title: 'Child of A',
					parent: '525cf20451979dea2c000001'
				});
				var projectE = new Projects({
					_id: '525cf20451979dea2c000005',
					title: 'Child of D',
					parent: '525cf20451979dea2c000004'
				});
				var projectF = new Projects({
					_id: '525cf20451979dea2c000006',
					title: 'Child of E',
					parent: '525cf20451979dea2c000005'
				});
				var projectG = new Projects({
					_id: '525cf20451979dea2c000007',
					title: 'Child of F',
					parent: '525cf20451979dea2c000006'
				});
				var projectH = new Projects({
					_id: '525cf20451979dea2c000008',
					title: 'Child of B',
					parent: '525cf20451979dea2c000002'
				});
				scope.projects = [projectA, projectB, projectC, projectD, projectE, projectF, projectG, projectH];
			}));
			it ('given a child, lookup(child) will return the top parent', inject(function(Projects) {
				//Find the parents and check if they are correct.
				expect(scope.resolveTop(scope.projects[3])).toBe(true);
				expect(scope.topProject).toBe(scope.projects[0]);
				
				expect(scope.resolveTop(scope.projects[4])).toBe(true);
				expect(scope.topProject).toBe(scope.projects[0]);
				
				expect(scope.resolveTop(scope.projects[5])).toBe(true);
				expect(scope.topProject).toBe(scope.projects[0]);
				
				expect(scope.resolveTop(scope.projects[7])).toBe(true);
				expect(scope.topProject).toBe(scope.projects[1]);
			}));
			it ('given a top parent, lookup(parent) will return parent', inject(function(Projects) {
				//Find the parents and check if they are correct.
				expect(scope.resolveTop(scope.projects[0])).toBe(true);
				expect(scope.topProject).toBe(scope.projects[0]);
				
				expect(scope.resolveTop(scope.projects[1])).toBe(true);
				expect(scope.topProject).toBe(scope.projects[1]);
				
				expect(scope.resolveTop(scope.projects[2])).toBe(true);
				expect(scope.topProject).toBe(scope.projects[2]);
			}));
		});
		describe('Tests canEdit()', function(){
	        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
	            // Set a new global scope
	            scope = $rootScope.$new();

	            // Point global variables to injected services
	            $stateParams = _$stateParams_;
	            $httpBackend = _$httpBackend_;
	            $location = _$location_;

	            // Initialize the Dashboard controller
	           ProjectController = $controller('ProjectsController', {
					$scope: scope
				});
				
				//Initialize a tree of projects
				var projectA = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'Project A',
					editPermission: 'public',
					editContributers: [],
					user: {
						_id: '5500abb9d21dec690fc66fe6'
					},
					$resolved: true
					
				});
				var projectB = new Projects({
					_id: '525cf20451979dea2c000002',
					title: 'Project B',
					editPermission: 'private',
					editContributers: [],
					user: {
						_id: '5500abb9d21dec690fc66fe6'
					},
					$resolved: true
				});
				var projectC = new Projects({
					_id: '525cf20451979dea2c000003',
					title: 'Project C',
					parent: '525cf20451979dea2c000002',
					$resolved: true
				});
				scope.projects = [projectA, projectB, projectC];
				scope.projects.$resolved = true;
			}));
			it ('Will not return if scope.project is not resolved', inject(function(Projects) {
				//Check if we can edit our projects as admins
				scope.project = scope.projects[0];
				scope.project.$resolved = false;
				expect(scope.canEdit()).toBe(undefined);
			}));
			it ('Will not return if scope.projects is not resolved', inject(function(Projects) {
				//Check if we can edit our projects as admins
				scope.project = scope.projects[0];
				scope.projects.$resolved = false;
				expect(scope.canEdit()).toBe(undefined);
			}));
			it ('Only admins are able to edit public or private projects', inject(function(Projects) {
				//Check if we can edit our projects as admins
				scope.project = scope.projects[0];
				scope.topProject = scope.projects[0];
				expect(scope.canEdit()).toBe(true);
				
				scope.project = scope.projects[1];
				scope.topProject = scope.projects[1];
				expect(scope.canEdit()).toBe(true);
				
				//Check if we cant when we are not an admin
				scope.authentication.user.isAdmin = false;
				
				scope.project = scope.projects[0];
				scope.topProject = scope.projects[0];
				expect(scope.canEdit()).toBe(false);
				
				scope.project = scope.projects[1];
				scope.topProject = scope.projects[1];
				expect(scope.canEdit()).toBe(false);
			}));
			it('only the creator can edit a private project with no editContirbutors', inject(function(Projects) {
				//Check if we can edit our private project
				scope.project = scope.projects[1];
				expect(scope.canEdit()).toBe(true);
				
				//Check if another admin cannot edit a private project
				scope.authentication.user._id = '5500abb9d21dec690fc66fe7';
				expect(scope.canEdit()).toBe(false);	
			}));
			it('admins on the edit contributor list can edit the project', inject(function(Projects) {
				scope.authentication.user._id = '5500abb9d21dec690fc66fe7';
				//Check if we can edit our private project
				scope.project = scope.projects[1];
				scope.project.editContributers.push('test@test.com');
				scope.project.editContributers.push('generic@email.com');
				expect(scope.canEdit()).toBe(true);
				scope.authentication.user.email = 'generic@email.com';
				expect(scope.canEdit()).toBe(true);
	
				//Check if another admin cannot edit a private project
				scope.authentication.user.email = 'notan@editor.com';
				expect(scope.canEdit()).toBe(false);	
			}));
			it('child projects share the properties of their parents', inject(function(Projects) {
				scope.authentication.user._id = '5500abb9d21dec690fc66fe7';
				//Check if we can edit our private project
				scope.project = scope.projects[2];
				scope.projects[1].editContributers.push('test@test.com');
				scope.projects[1].editContributers.push('generic@email.com');
				expect(scope.canEdit()).toBe(true);
				scope.authentication.user.email = 'generic@email.com';
				expect(scope.canEdit()).toBe(true);
	
				//Check if another admin cannot edit a private project
				scope.authentication.user.email = 'notan@editor.com';
				expect(scope.canEdit()).toBe(false);	
			}));
		});
		describe('Tests canView()', function(){
	        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
	            // Set a new global scope
	            scope = $rootScope.$new();

	            // Point global variables to injected services
	            $stateParams = _$stateParams_;
	            $httpBackend = _$httpBackend_;
	            $location = _$location_;

	            // Initialize the Dashboard controller
	           ProjectController = $controller('ProjectsController', {
					$scope: scope
				});
				
				//Initialize a tree of projects
				var projectA = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'Project A',
					viewPermission: 'public',
					viewContributers: [],
					user: {
						_id: '5500abb9d21dec690fc66fe6'
					},
					$resolved: true
					
				});
				var projectB = new Projects({
					_id: '525cf20451979dea2c000002',
					title: 'Project B',
					viewPermission: 'private',
					viewContributers: [],
					user: {
						_id: '5500abb9d21dec690fc66fe6'
					},
					$resolved: true
				});
				var projectC = new Projects({
					_id: '525cf20451979dea2c000003',
					title: 'Project C',
					parent: '525cf20451979dea2c000002',
					$resolved: true
				});
				scope.projects = [projectA, projectB, projectC];
				scope.projects.$resolved = true;
			}));
			it ('All users can view public projects', inject(function(Projects) {
				//Check if we can view our projects as admins
				scope.project = scope.projects[0];
				expect(scope.canView(scope.project)).toBe(true);
				
				scope.project = scope.projects[1];
				scope.topProject = scope.projects[1];
				expect(scope.canView(scope.project)).toBe(true);
				
				//Check if we can view as non-admins
				scope.authentication.user.isAdmin = false;
				scope.authentication.user._id = 'incorrect';
				
				scope.project = scope.projects[0];
				scope.topProject = scope.projects[0];
				expect(scope.canView(scope.project)).toBe(true);
				
				scope.project = scope.projects[1];
				scope.topProject = scope.projects[1];
				expect(scope.canView(scope.project)).toBe(false);
			}));
			it('only the creator can view a private project with no view contirbutors', inject(function(Projects) {
				//Check if we can edit our private project
				scope.project = scope.projects[1];
				expect(scope.canView(scope.project)).toBe(true);
				
				//Check if another admin cannot edit a private project
				scope.authentication.user._id = '5500abb9d21dec690fc66fe7';
				expect(scope.canView(scope.project)).toBe(false);
			}));
			it('users on the view contributor list can view the private project', inject(function(Projects) {
				scope.authentication.user._id = '5500abb9d21dec690fc66fe7';
				scope.authentication.user.isAdmin = false;
				
				//Check if we can view someone elses private project
				scope.project = scope.projects[1];
				scope.project.viewContributers.push('test@test.com');
				scope.project.viewContributers.push('generic@email.com');
				expect(scope.canView(scope.project)).toBe(true);
				scope.authentication.user.email = 'generic@email.com';
				expect(scope.canView(scope.project)).toBe(true);
	
				//Check if another admin cannot edit a private project
				scope.authentication.user.email = 'notan@editor.com';
				expect(scope.canView(scope.project)).toBe(false);
			}));
			it('child projects share the properties of their parents', inject(function(Projects) {
				scope.authentication.user._id = '5500abb9d21dec690fc66fe7';
				scope.authentication.user.isAdmin = false;
				
				//Check if we can view someone elses private project
				scope.project = scope.projects[2];
				scope.projects[1].viewContributers.push('test@test.com');
				scope.projects[1].viewContributers.push('generic@email.com');
				expect(scope.canView(scope.project)).toBe(true);
				scope.authentication.user.email = 'generic@email.com';
				expect(scope.canView(scope.project)).toBe(true);
	
				//Check if another admin cannot edit a private project
				scope.authentication.user.email = 'notan@editor.com';
				expect(scope.canView(scope.project)).toBe(false);
			}));
		});
		//***************************************************
		// 					add contibutors
		//*************************************************
		describe('Tests adding contirbutors', function(){
	        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
	            // Set a new global scope
	            scope = $rootScope.$new();

	            // Point global variables to injected services
	            $stateParams = _$stateParams_;
	            $httpBackend = _$httpBackend_;
	            $location = _$location_;

	            // Initialize the Dashboard controller
	           ProjectController = $controller('ProjectsController', {
					$scope: scope
				});
				
				//Initialize a tree of projects
				var project = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'Project A',
					viewPermission: 'private',
					viewContributers: [],
					editPermission: 'public',
					editContributers: [],
					user: {
						_id: '5500abb9d21dec690fc66fe6'
					},
					$resolved: true
				});
				scope.project = project;
					
			}));
			// VIEW
			it ('addViewContributor() adds a contributor to the project', inject(function(Projects) {
				scope.addViewContributer('userA@gmail.com');
				expect(scope.project.viewContributers[0]).toBe('userA@gmail.com');
			}));
			it ('addViewContributor() adds multiple contributor to the project', inject(function(Projects) {
				scope.addViewContributer('userA@gmail.com');
				scope.addViewContributer('userB@gmail.com');
				
				expect(scope.project.viewContributers[0]).toBe('userA@gmail.com');
				expect(scope.project.viewContributers[1]).toBe('userB@gmail.com');
			}));
			it ('addViewContributor() will not add the same user multiple times', inject(function(Projects) {
				scope.addViewContributer('userA@gmail.com');
				expect(scope.project.viewContributers[0]).toBe('userA@gmail.com');
				expect(scope.project.viewContributers.length).toBe(1);
				scope.addViewContributer('userA@gmail.com');
				expect(scope.project.viewContributers[0]).toBe('userA@gmail.com');
				expect(scope.project.viewContributers[1]).toBe(undefined);
				expect(scope.project.viewContributers.length).toBe(1);
				
			}));
			// EDIT
			it ('addEditContributer() adds a contributor to the project', inject(function(Projects) {
				scope.addEditContributer('userA@gmail.com');
				expect(scope.project.editContributers[0]).toBe('userA@gmail.com');
			}));
			it ('addEditContributer() adds multiple contributor to the project', inject(function(Projects) {
				scope.addEditContributer('userA@gmail.com');
				scope.addEditContributer('userB@gmail.com');
				
				expect(scope.project.editContributers[0]).toBe('userA@gmail.com');
				expect(scope.project.editContributers[1]).toBe('userB@gmail.com');
			}));
			it ('addEditContributer() will not add the same user multiple times', inject(function(Projects) {
				scope.addEditContributer('userA@gmail.com');
				expect(scope.project.editContributers[0]).toBe('userA@gmail.com');
				expect(scope.project.editContributers.length).toBe(1);
				
				scope.addEditContributer('userA@gmail.com');
				expect(scope.project.editContributers[0]).toBe('userA@gmail.com');
				expect(scope.project.editContributers[1]).toBe(undefined);
				expect(scope.project.editContributers.length).toBe(1);
				
			}));
			//CHANGE
			it ('changePermission() correctly changes edit permissions', inject(function(Projects) {
				scope.changePermission('edit', 'private');
				expect(scope.project.editPermission).toBe('private');
				scope.changePermission('edit', 'public');
				expect(scope.project.editPermission).toBe('public');
				scope.changePermission('edit', 'private');
				expect(scope.project.editPermission).toBe('private');
			}));
			it ('changePermission() correctly changes view permissions', inject(function(Projects) {
				scope.changePermission('view', 'private');
				expect(scope.project.viewPermission).toBe('private');
				scope.changePermission('view', 'public');
				expect(scope.project.viewPermission).toBe('public');
				scope.changePermission('view', 'private');
				expect(scope.project.viewPermission).toBe('private');
			}));
		});
		describe('Tests addContributer()', function(){
	        beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Projects) {
	            // Set a new global scope
	            scope = $rootScope.$new();

	            // Point global variables to injected services
	            $stateParams = _$stateParams_;
	            $httpBackend = _$httpBackend_;
	            $location = _$location_;

	            // Initialize the Dashboard controller
	           ProjectController = $controller('ProjectsController', {
					$scope: scope
				});
				
				//Initialize a tree of projects
				var projectA = new Projects({
					_id: '525cf20451979dea2c000001',
					title: 'Project A',
					contributers: [],
					user: {
						_id: '5500abb9d21dec690fc66fe6'
					},
					$resolved: true
					
				});
				scope.project = projectA;
			}));
			it ('addContributer adds the current user as a contirbutor', inject(function(Projects) {
				expect(scope.project.contributers[0]).toBe(undefined);
				scope.addContributer();
				expect(scope.project.contributers[0]).toBe('5500abb9d21dec690fc66fe6');
				
			}));
			it ('addContributer adds the multiple user as a contirbutor', inject(function(Projects) {
				expect(scope.project.contributers[0]).toBe(undefined);
				scope.addContributer();
				scope.authentication.user._id = '5500abb9d21dec690fc66fe7';
				scope.addContributer();
				expect(scope.project.contributers[0]).toBe('5500abb9d21dec690fc66fe6');
				expect(scope.project.contributers[1]).toBe('5500abb9d21dec690fc66fe7');
				
			}));
			it ('addContributer will not add the same user more than once', inject(function(Projects) {
				expect(scope.project.contributers[0]).toBe(undefined);
				scope.addContributer();
				scope.addContributer();
				expect(scope.project.contributers[0]).toBe('5500abb9d21dec690fc66fe6');
				expect(scope.project.contributers[1]).toBe(undefined);
				expect(scope.project.contributers.length).toBe(1);
				
			}));
		});
		it ('toggelEdit will toggle the isEditing member', inject(function(Projects) {
			var element = {tag: 'text', value: 'test', isEditing: false};
			scope.toggleEdit(element);
			expect(element.isEditing).toBe(true);
			scope.toggleEdit(element);
			expect(element.isEditing).toBe(false);
				
		}));
		
		it ('set active elment index returns valid element indexs', inject(function(Projects) {
			//create a project with some elements
			var elementA = {tag: 'text', value: 'A', isEditing: false};
			var elementB = {tag: 'equation', value: 'B', isEditing: false};
			var elementC = {tag: 'image', value: 'C', isEditing: false};
			var elementD = {tag: 'video', value: 'D', isEditing: false};
			var projectA = new Projects({
				title: 'Project Test',
				viewPermission: 'public',
				elements: [elementA, elementB, elementC, elementD]
			});
			scope.project = projectA;
			
			scope.setActiveElement(elementA);
			expect(scope.activeElementIndex).toBe(0);
			scope.setActiveElement(elementC);
			expect(scope.activeElementIndex).toBe(2);
			
			scope.setActiveElement(elementB);
			expect(scope.activeElementIndex).toBe(1);
			
			
				
		}));
	});
}());
