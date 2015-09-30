'use strict';

(function() {
	describe('HomeController', function() {
		//Initialize global variables
		var scope,
			HomeController;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			HomeController = $controller('HomeController', {
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

		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});
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
		describe('Tests .resolveTop()', function(){
	        beforeEach(inject(function($controller, $rootScope, Projects) {
	            // Set a new global scope
	            scope = $rootScope.$new();

	            // Point global variables to injected services

	            // Initialize the Dashboard controller
	            HomeController = $controller('HomeController', {
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
				expect(scope.resolveTop(scope.projects[3])).toBe(scope.projects[0]);
				
				expect(scope.resolveTop(scope.projects[4])).toBe(scope.projects[0]);
				
				expect(scope.resolveTop(scope.projects[5])).toBe(scope.projects[0]);
				
				expect(scope.resolveTop(scope.projects[7])).toBe(scope.projects[1]);
			}));
			it ('given a top parent, lookup(parent) will return parent', inject(function(Projects) {
				//Find the parents and check if they are correct.
				expect(scope.resolveTop(scope.projects[0])).toBe(scope.projects[0]);
				
				expect(scope.resolveTop(scope.projects[1])).toBe(scope.projects[1]);
				
				expect(scope.resolveTop(scope.projects[2])).toBe(scope.projects[2]);
			}));
		});
		describe('Tests canView()', function(){
	        beforeEach(inject(function($controller, $rootScope, Projects) {
	            // Set a new global scope
	            scope = $rootScope.$new();

	            // Point global variables to injected services

	            // Initialize the Dashboard controller
	            HomeController = $controller('HomeController', {
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
	});
})();
