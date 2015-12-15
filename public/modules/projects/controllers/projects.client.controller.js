'use strict';

var myApp = angular.module('projects').controller('ProjectsController', ['$scope','$rootScope', '$http', '$stateParams', '$location', '$upload', '$modal', '$sce', 'Authentication', 'Projects','$state', '$timeout',
	function($scope, $rootScope, $http, $stateParams, $location, $upload, $modal, $sce, Authentication, Projects, $state, $timeout) {

		$scope.authentication = Authentication;
		$scope.textToAppend = '';
    	$scope.sc = $sce;
		$scope.heading= '';
		$scope.obj={};
		$scope.activeElementIndex = -1;
		$scope.foundTop = false;
    	$scope.chart ={};
    	$scope.graphTitle = '';
    	$scope.xTitle = '';
    	$scope.yTitle = '';
    	$scope.graphPoints = [];
    	$scope.chartArray = [];
			$scope.videoEmbed = '';
			$scope.elementsOfCurrentProject = [];

        //Looks up the project id 
		$scope.lookup = function(id)
		{
			var projects = $scope.projects;
			for (var i =0; i < projects.length; i++)
			{
				if (projects[i]._id === id) return projects[i];
			}
			return false;
		};

		//Finds the top level(project) of the current project we're in
		$scope.resolveTop = function(project)
		{
			//var project = $scope.project;
			var projects = $scope.projects;
			if ($scope.foundTop) return true;

			var current = project;
			while (current.parent !== undefined)
			{

				current = $scope.lookup(current.parent);
			}
			if (current.parent === undefined)
			{
				$scope.topProject = current;
				$scope.foundTop = true;
				return true;
			}
			return false;
		};

		$scope.setScopeProjectElementsArray = function(id)
		{
				$scope.elementsOfCurrentProject = $scope.lookup(id).elements;
		};
         
         //Finds the ID for the top level project
		$scope.resolveTopID = function(project)
		{
			var projects = $scope.projects;
			var current = project;

			while(current.parent !== undefined){
					current = $scope.lookup(current.parent);

			}
			if(current.parent === undefined){

				return current._id;

			}

			return false;


		};

         // Checks to see if the user has permissions to edit the project
		$scope.canEdit = function()
		{
			var project = $scope.project;
			var projects = $scope.projects;

			if (projects.$resolved && project.$resolved)
			{
				$scope.resolveTop(project);
				var topProject = $scope.topProject;
				if (!Authentication.user.isAdmin) return false;
				else if ($rootScope.inPreview) return false;
				else if (topProject.editPermission === 'public') return true;
				else if ($scope.authentication.user._id === topProject.user._id) return true;
				else if (topProject.editContributers.indexOf($scope.authentication.user.email) !== -1) return true;
				else return false;
			}
		};

		//Checks to see if the user has permissions to view the project
		$scope.canView = function(project)
		{
			if ($scope.resolveTop(project))
			{
				var topProject = $scope.topProject;
				if (topProject.viewPermission === 'public') return true;
				else if (Authentication.user._id === topProject.user._id) return true;
				else if (topProject.viewContributers.indexOf(Authentication.user.email) !== -1) return true;
				else return false;
			}
		};
		//Adds a user who can contribute to a project
		$scope.addViewContributer = function (email) {
			var project = $scope.project;
			if (project.viewContributers.indexOf(email) === -1)
			{
				project.viewContributers.push(email);
			}
		};
        //Adds a user who can contribute to a project 
		$scope.addEditContributer = function (email) {
			var project = $scope.project;
			if (project.editContributers.indexOf(email) === -1)
			{
				project.editContributers.push(email);
			}
		};

		//Opens Modal of every contributor who can view the project
		$scope.openViewContributorsModal  = function (isView, msg, size) {
			var modalInstance = $modal.open({
				templateUrl: 'modules/projects/views/modals/view-contributors.modal.client.html',
				controller: 'ModalController',
				size: size,
				resolve: {
					message: function() {
						return msg;
					},
					project: function() {
						return $scope.project;
					}
				}
			});
			modalInstance.result.then(function (response) {
				console.log(response);


				return response;
				}, function () {
					console.log('Modal dismissed at: ' + new Date());
				});
		};

		//Opens Modal of every contributor who can add to the project
		$scope.openAddContributorsModal = function (isView, msg, size) {
			var modalInstance = $modal.open({
				templateUrl: 'modules/projects/views/modals/add-contributors.modal.client.html',
				controller: 'ModalController',
				size: size,
				resolve: {
					message: function() {
						return msg;
					},
					project: function() {
						return $scope.project;
					}
				}
			});
			modalInstance.result.then(function (response) {
				console.log(response);
				var i;
				if (isView)
				{
					for (i =0; i< response.length; i++)
					{
						$scope.addViewContributer(response[i]);
					}
				}
				else
				{
					for (i =0; i< response.length; i++)
					{
						$scope.addEditContributer(response[i]);
					}
				}

				$scope.project.$update(function() {
					//$location.path('projects/' + $scope.project._id + '/permissions');
          			$state.go('home.permissionsProject',{projectId:$scope.project._id},{reload:true});
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});

				return response;
				}, function () {
					console.log('Modal dismissed at: ' + new Date());
				});
		};
		//Opens Modal of every contributor who can remove from the project
		$scope.openRemoveContributorsModal = function (isView, msg, size) {
			var modalInstance = $modal.open({
				templateUrl: 'modules/projects/views/modals/remove-contributors.modal.client.html',
				controller: 'ModalController',
				size: size,
				resolve: {
					message: function() {
						return msg;
					},
					project: function() {
						return $scope.project;
					}
				}
			});
			modalInstance.result.then(function (response) {
				console.log(response);
				var i;
				var index;
				if (isView)
				{
					for (i =0; i< response.length; i++)
					{
						index = $scope.project.viewContributers.indexOf(response[i]);
						if (index !== -1) $scope.project.viewContributers.splice(index,1);
					}
				}
				else
				{
					for (i =0; i< response.length; i++)
					{
						for (i =0; i< response.length; i++)
						{
							index = $scope.project.editContributers.indexOf(response[i]);
							if (index !== -1) $scope.project.editContributers.splice(index,1);
						}
					}
				}

				$scope.project.$update(function() {
					//$location.path('projects/' + $scope.project._id + '/permissions');
        			$state.go('home.permissionsProject',{projectId:$scope.project._id},{reload:true});
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});

				return response;
				}, function () {
					console.log('Modal dismissed at: ' + new Date());
				});
		};
         //changes the permission of the person viewing the project
		$scope.changePermission = function (permission, state)
		{
			var project = $scope.project;
			if (permission === 'edit')
			{
				project.editPermission = state;
			}
			else
			{
				project.viewPermission = state;
			}
			project.$update(function() {
				//$location.path('projects/' + project._id + '/permissions');
        		$state.go('home.permissionsProject',{projectId:project._id},{reload:true});
				},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

         //Adds a contibutor to a project
		$scope.addContributer = function () {
			var project = $scope.project;
			if (project.contributers.indexOf($scope.authentication.user._id) === -1)
			{
				project.contributers.push($scope.authentication.user._id);
			}
		};
         
         //checks to see if the person is a contributor to a project
		$scope.isContributer = function (project) {
			if (project.contributers.indexOf(Authentication.user._id) !== -1)
			{
				return true;
			}
			else
			{
				return false;
			}
		};



		//This will open a delete modal
		//	put no_element if the object is a project, msg will be displayed, size =['sm','lg'] or default
		$scope.openDeleteModal = function (element, msg, size) {
			var modalInstance = $modal.open({
				templateUrl: 'modules/projects/views/modals/confirmation-modal.client.view.html',
				controller: 'ModalController',
				size: size,
				resolve: {
					message: function() {
						return msg;
					},
					project: function() {
						return $scope.project;
					}
				}
			});
			modalInstance.result.then(function (response) {
				if (element === 'no_element')
				{
					$scope.remove();
				}
				else
				{
					$scope.deleteElement(element);
				}
				return response;
				}, function () {
					console.log('Modal dismissed at: ' + new Date());
				});
		};
          //This will open a delete question modal
		$scope.openDeleteQuestionModal = function (question, msg, size) {
			var modalInstance = $modal.open({
				templateUrl: 'modules/projects/views/modals/confirmation-modal.client.view.html',
				controller: 'ModalController',
				size: size,
				resolve: {
					message: function() {
						return msg;
					},
					project: function() {
						return $scope.project;
					}
				}
			});
			modalInstance.result.then(function (response) {
					$scope.deleteQuestion(question);
				return response;
				}, function () {
					console.log('Modal dismissed at: ' + new Date());
				});
		};

        //closes and opens the editing feature
		$scope.toggleEdit = function(element){
			element.isEditing = !element.isEditing;
		};
        //cancels the edit feature
		$scope.cancelEdit = function(element) {
			$scope.findOne();
		};
        //Initiates element 
		$scope.setActiveElement = function(element) {
			$scope.activeElementIndex = $scope.project.elements.indexOf(element);
		};
        //creates a new project
		$scope.create_project = function() {
			var project = new Projects({
				title: this.title,
				content: this.content,
				contributers: [Authentication.user._id],
				level: 1
			});

			project.$save(function(response) {
				$state.go('home.viewProject',{projectId:response._id},{reload:true});
        		$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

         //deletes an element in a project
		$scope.deleteElement = function(element) {
			$scope.addContributer();
			var project = $scope.project;

			project.elements.splice(project.elements.indexOf(element),1);

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject',{projectId:project._id});
				},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//this is a legacy function. Can remove if you want. 
		//Allows the user to edit an element
		$scope.edit_element = function(element) {
			$scope.addContributer();
			var project = $scope.project;
			$scope.activeElementIndex = project.elements.indexOf(element);

			console.log(element);
			console.log('index: ' + $scope.activeElementIndex);

			if (element.tag === 'text') {
				//$location.path('projects/' + project._id + '/edit-text/' + project.elements.indexOf(element));
        		$state.go('home.editTextProject', {projectId:project._id, elementIndex:project.elements.indexOf(element)},{reload:true});
			}
			if (element.tag === 'image' || element.tag === 'video' || element.tag === 'audio') {
				//$location.path('projects/' + project._id + '/edit-file/' + project.elements.indexOf(element));
        		$state.go('home.editFileProject', {projectId:project._id, elementIndex:project.elements.indexOf(element)},{reload:true});
			}
		};
        //Allows the user to remove a project
		function removeProjects() {
			$scope.project.$remove(function() {
				$state.go('home.viewProject', {}, {reload:true});
			});
		}
         //Allows the user to remove a certain element
		$scope.remove = function() {
			$scope.addContributer();
			var proj = $scope.project;
			var arr = new Array(proj);
			delete_func(proj._id, arr, proj.level, proj.title);
			for(var index = 0; index < arr.length; index++){

				if (arr[index]) {
					arr[index].$remove();

					for (var i in $scope.projects) {
						if ($scope.projects[i] === arr[index]) {
							$scope.projects.splice(i, 1);
						}
					}
				} else {
					removeProjects();
				}
			}
			$state.go('home.openProject',{},{reload:true});
		};

		function delete_func(del_id, arr, level, del_title){
			for (var i = 0; i < $scope.projects.length; i++){
				//console.log($scope.projects[i].title);
				if($scope.projects[i].parent === del_id){
					arr.push($scope.projects[i]);
					delete_func($scope.projects[i]._id, arr, level + 1);
				}
				else if($scope.projects[i].children.length > 0){
					for(var j = 0; j < $scope.projects[i].children.length; j++){
						if($scope.projects[i].children[j].title === del_title){
							$scope.projects[i].children.splice(j,1);
							$scope.projects[i].$update(function(){});
						}
					}
				}
			}
		}
         //Adds text to a certain element
		$scope.appendText = function() {
			$scope.addContributer();
			var project = $scope.project;

			var my_index = get_insert_index(project);

			project.elements.push({tag: 'text', value: $scope.textToAppend, index: my_index});

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject', {projectId:project._id});
				$scope.textToAppend = '';
			},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Adds the table structure to the element
		$scope.appendTable = function() {
			$scope.addContributer();
			var project = $scope.project;

			var my_index = get_insert_index(project);

			project.elements.push({tag: 'table', value: $scope.textToAppend, index: my_index});

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject', {projectId:project._id});
				$scope.textToAppend = '';
			},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//Adds a link to a element
		$scope.appendLink = function(workspaceID, sectionID, elementID){
			console.log(workspaceID);
			console.log(sectionID);
			$scope.addContributer();
			var project = $scope.project;
			var determineTarget = workspaceID;

			var my_index = get_insert_index(project);
			if(sectionID){
				determineTarget = sectionID;
			}

			var determineProject = $scope.lookup(determineTarget);
			var determineTitle = determineProject.title;
			console.log(determineTitle);
			console.log(determineTarget);
			//data title is used by graph element, we will use dataTitle to test if we can actually pass elementID
			project.elements.push({tag: 'linkButton', value: determineTarget, heading: determineTitle, index: my_index, dataTitle: elementID});

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject', {projectId:project._id});

			},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
        //Sets a graph to certain type
		$scope.setGraphType = function(label){
			$scope.graphType = label;
			$scope.drawGraphPreview();
		};
        //Gets the index number of the graph
        $scope.getGraphIndex = function(element){
            for(var i = 0; i< element.length; i++){
                if(element.heading === $scope.chartArray.options.title) return i;
            }
            return -1;
        };
        //Adds a point to the graph
        $scope.addGraphPoint = function(){
			var points = $scope.graphPoints;
			var x = $scope.xToAppend;
			for(var i = 0; i < points.length; ++i){
				if(points[i].x === x){
					points[i].y = $scope.yToAppend;
					$scope.xToAppend = '';
					$scope.yToAppend = '';
					$scope.drawGraphPreview();
					return;
				}
				else if(parseInt(points[i].x,10) > parseInt(x)){
					points.splice(i, 0, {x: $scope.xToAppend, y: $scope.yToAppend});
					$scope.xToAppend = '';
					$scope.yToAppend = '';
					$scope.drawGraphPreview();
					return;
				}
			}
            $scope.graphPoints.push({x: $scope.xToAppend,y: $scope.yToAppend});
            $scope.xToAppend = '';
            $scope.yToAppend = '';
            $scope.drawGraphPreview();

        };
        //Adds a graph to an element
        $scope.appendGraph = function(){
            $scope.addContributer();
            var project = $scope.project;
            var my_index = get_insert_index(project);
            project.elements.push({ tag: 'graph',
                                    heading: $scope.graphTitle,
                                    index: my_index,
                                    x_name: $scope.xTitle,
                                    y_name: $scope.yTitle,
                                    dataTitle: $scope.dataTitle,
                                    graphType: $scope.graphType,
                                    graph_points: $scope.graphPoints });


            project.$update(function()
            {
				//$location.path('projects/' + project._id);
        	    $state.go('home.viewProject',{projectId:project._id},{reload:true});
            },
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

        };

        //Gives you a preview of a graph that was drawn
        $scope.drawGraphPreview = function(){
            console.log('In draw graph');
            //console.log(element.x_name);
            //console.log(element.y_name);
            //console.log(element.heading);
            //console.log(element.graph_points);
            var chart1 = $scope.chart;
            if($scope.graphType)
				chart1.type = $scope.graphType;
			else
				chart1.type = 'ColumnChart';
            chart1.cssStyle = 'height:200px; width:300px;';
            chart1.data = {'cols': [
                {id: 'month', label: 'Month', type: 'string'},
                {id: 'cost-id', label: $scope.dataTitle, type: 'number'}
            ], 'rows': []

            };


            for(var i=0; i<$scope.graphPoints.length; i++){
                chart1.data.rows.push(
                    {c: [
                        {v: $scope.graphPoints[i].x},
                        {v: $scope.graphPoints[i].y},
                    ]}
                );
            }

            chart1.options = {
                'title': $scope.graphTitle,
                'isStacked': 'true',
                'fill': 20,
                'displayExactValues': true,
                'vAxis': {
                    'title': $scope.yTitle, 'gridlines': {'count': 6}
                },
                'hAxis': {
                    'title': $scope.xTitle
                }
            };

        };

        // Creates an element which allows the user to draw a graph
        $scope.drawGraph = function(element){
            console.log('In draw graph');
            //console.log(element.x_name);
            //console.log(element.y_name);
            //console.log(element.heading);
            //console.log(element.graph_points);

            element.graph ={};
            element.graph.type = element.graphType;
            element.graph.cssStyle = 'height:200px; width:300px;';
            element.graph.data = {'cols': [
                {id: 'month', label: 'Month', type: 'string'},
                {id: 'cost-id', label: element.dataTitle, type: 'number'}
            ], 'rows': []

            };


            for(var i=0; i<element.graph_points.length; i++){
                element.graph.data.rows.push(
                    {c: [
                        {v: element.graph_points[i].x},
                        {v: element.graph_points[i].y},
                    ]}
                );
            }

            element.graph.options = {
                'title': element.heading,
                'isStacked': 'true',
                'fill': 20,
                'displayExactValues': true,
                'vAxis': {
                    'title': element.y_name, 'gridlines': {'count': 6}
                },
                'hAxis': {
                    'title': element.x_name
                }
            };

        };

          //gets the index of the element that is going to be inserted
		function get_insert_index (project)
		{
			var elements = project.elements;
			var length = elements.length;
			var max_index = 0;
			for (var i = 0; i !== length; ++i)
			{
				if (elements[i].index > max_index)
				{
					max_index = elements[i].index;
				}
			}

			return max_index + 1;
		}

		  //allows the user to insert a question
		$scope.insertQuestion = function() {
			var project = $scope.project;
			var questionType;
			var correctAnswers;
			var answerChoices;
			var feedbacks;
			if (document.getElementById('r1').checked) {	/* Multiple Choice */
				questionType = document.getElementById('r1').value;
				answerChoices = [document.getElementById('mcAnswer1').value];
				answerChoices.push(document.getElementById('mcAnswer2').value);
				answerChoices.push(document.getElementById('mcAnswer3').value);
				feedbacks = [document.getElementById('mcFeedback1').value];
				feedbacks.push(document.getElementById('mcFeedback2').value);
				feedbacks.push(document.getElementById('mcFeedback3').value);
				if($scope.numChoices >= 4){
					answerChoices.push(document.getElementById('mcAnswer4').value);
					feedbacks.push(document.getElementById('mcFeedback4').value);
				}
				if($scope.numChoices >= 5){
					answerChoices.push(document.getElementById('mcAnswer5').value);
					feedbacks.push(document.getElementById('mcFeedback5').value);
				}
				if($scope.numChoices >= 6){
					answerChoices.push(document.getElementById('mcAnswer6').value);
					feedbacks.push(document.getElementById('mcFeedback6').value);
				}
				if (document.getElementById('mc1').checked)
					correctAnswers = [document.getElementById('mcAnswer1').value];
				else if(document.getElementById('mc2').checked)
					correctAnswers = [document.getElementById('mcAnswer2').value];
				else if(document.getElementById('mc3').checked)
					correctAnswers = [document.getElementById('mcAnswer3').value];
				else if(document.getElementById('mc4').checked)
					correctAnswers = [document.getElementById('mcAnswer4').value];
				else if(document.getElementById('mc5').checked)
					correctAnswers = [document.getElementById('mcAnswer5').value];
				else if(document.getElementById('mc6').checked)
					correctAnswers = [document.getElementById('mcAnswer6').value];
			}
			else if (document.getElementById('r2').checked) {	/* Multiple Selection */
				questionType = document.getElementById('r2').value;
				answerChoices = [document.getElementById('msAnswer1').value];
				answerChoices.push(document.getElementById('msAnswer2').value);
				answerChoices.push(document.getElementById('msAnswer3').value);
				feedbacks = [document.getElementById('msFeedback1').value];
				feedbacks.push(document.getElementById('msFeedback2').value);
				feedbacks.push(document.getElementById('msFeedback3').value);
				if($scope.numSelections >= 4){
					answerChoices.push(document.getElementById('msAnswer4').value);
					feedbacks.push(document.getElementById('msFeedback4').value);
				}
				if($scope.numSelections >= 5){
					answerChoices.push(document.getElementById('msAnswer5').value);
					feedbacks.push(document.getElementById('msFeedback5').value);
				}
				if($scope.numSelections >= 6){
					answerChoices.push(document.getElementById('msAnswer6').value);
					feedbacks.push(document.getElementById('msFeedback6').value);
				}
				correctAnswers = [];
				if (document.getElementById('ms1').checked)
					correctAnswers.push(document.getElementById('msAnswer1').value);
				if(document.getElementById('ms2').checked)
					correctAnswers.push(document.getElementById('msAnswer2').value);
				if(document.getElementById('ms3').checked)
					correctAnswers.push(document.getElementById('msAnswer3').value);
				if($scope.numSelections >= 4 && document.getElementById('ms4').checked)
					correctAnswers.push(document.getElementById('msAnswer4').value);
				if($scope.numSelections >= 5 && document.getElementById('ms5').checked)
					correctAnswers.push(document.getElementById('msAnswer5').value);
				if($scope.numSelections >= 6 && document.getElementById('ms6').checked)
					correctAnswers.push(document.getElementById('msAnswer6').value);
			}
			else if (document.getElementById('r3').checked) {	/* True/False */
				questionType = document.getElementById('r3').value;
				if(document.getElementById('tf1').checked)
					correctAnswers = [document.getElementById('tf1').value];
				else
					correctAnswers = [document.getElementById('tf2').value];
				answerChoices = ['True'];
				answerChoices.push('False');
				feedbacks = [document.getElementById('tfFeedback1').value];
				feedbacks.push(document.getElementById('tfFeedback2').value);
			}

			project.questions.push({tag: questionType, explanation: $scope.explanation, query: $scope.query, choices: answerChoices,
									answers: correctAnswers, result: false, answered: false, responses: [], checked: false, feedback: feedbacks});

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject', {projectId:project._id}, {reload:true});
				},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		  //allows user to delete a question
		$scope.deleteQuestion = function(question) {
			var project = $scope.project;
			project.questions.splice(project.questions.indexOf(question),1);

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject',{projectId:project._id},{reload:true});
			},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		  //allows the user to set the answer to the question
		$scope.setAnswer = function(selection, question) {
			question.responses = [selection];
			if(selection === question.answers[0]){
				question.result = true;
			}
			else{
				question.result = false;
			}
			question.answered = false;
			question.checked = true;
		};
		  //allows the user to set multiple answers to the question
		$scope.setMultipleAnswer = function(selection, question) {
			for(var i = 0; i < question.responses.length; ++i){
				if(question.responses[i] === selection){
					question.responses.splice(i, 1);
					if(question.responses.length === 0){
						question.checked = false;
					}
					question.answered = false;
					if(compareAnswers(question.responses,question.answers)){
						question.result = true;
						question.answered = false;
						$scope.score++;
					}
					else
						question.result = false;
					return;
				}
			}
			question.responses.push(selection);
			if(compareAnswers(question.responses,question.answers)){
				question.result = true;
			}
			else
				question.result = false;
			question.answered = false;
			question.checked = true;
		};
		  //compares the answer recorded to the correct answer
		function compareAnswers(arr1, arr2){
			arr1.sort();
			arr2.sort();
			if(arr1.length !== arr2.length)
				return false;
			for(var i = 0; i < arr1.length; ++i){
				if(arr1[i] !== arr2[i])
					return false;
			}
			return true;
		}
		  //checks the answer recorded to see if it is correct
		$scope.checkAnswer = function(question) {
			var proj = $scope.project;
			var tally = 0;
			var i;
			for(i = 0; i < proj.questions.length; ++i){
				if(proj.questions[i].result === true)
					++tally;
			}
			$scope.score = tally;
			$scope.numQuestions = proj.questions.length;
			proj.reports.push({quizTitle: proj.title, question: question.explanation, selectedAnswers: [],
								correctAnswers: question.answers, isCorrect: question.result, student: Authentication.user.displayName});
			for(i = 0; i < question.responses.length; ++i){
				proj.reports[proj.reports.length-1].selectedAnswers.push(question.responses[i]);
			}
			$scope.hasQuestions = true;
			question.answered = true;
			$scope.displayFeedback = true;
		};
		  //the function to see whether or not the answer is correct
		$scope.displayFeedbackFunc = function(){
			var proj = $scope.project;
			for(var i = 0; i < proj.questions.length; ++i){
				proj.questions[i].responses = [];
				proj.questions[i].answered = false;
			}
			proj.$update(function() {
				//$location.path('projects/' + proj._id);
        		$state.go('home.viewProject',{projectId:proj._id},{reload:true});
				},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			$scope.displayFeedback = true;
			$scope.displayScore = true;
		};
		  //shows the feedback about whether or not the answer is correct
		$scope.showFeedback = function(question, i) {
			for(var j = 0; j < question.responses.length; ++j){
				if(question.responses[j] === question.choices[i]){
					if(question.feedback[i] !== '')
						return true;
				}
			}
			return false;
		};
		  //allows user to edit an equation
		$scope.appendEquation = function() {
			$scope.addContributer();
			var project = $scope.project;
			var my_index = get_insert_index(project);

			project.elements.push({tag: 'equation', value: $scope.textToAppend, index: my_index});

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject',{projectId:project._id},{reload:true});
				$scope.textToAppend = '';
			},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		  //records the type of question selected
		$scope.questionTypeSelected = function(type) {
			$scope.questionType = type;
		};
		  //records the number of solutions in multiple choice question
		$scope.numberMultipleChoices = function(num) {
			$scope.numChoices = num;
			$scope.pickedMC = true;
			$scope.pickedMS = false;
		};

		/*$scope.getNumChoices = function(num) {
		    return numChoices;
		};*/
		  //records the number of solutions in multiple selections question
		$scope.numberMultipleSelections = function(num) {
			$scope.numSelections = num;
			$scope.pickedMS = true;
			$scope.pickedMC = false;
		};

		//$scope.number = 0;
		$scope.getNumber = function(num) {
		    return new Array(num);
		};
		  //allows user to edit a file
		$scope.editFile = function(files) {
			$scope.addContributer();
			var project = $scope.project;
			var fd = new FormData();

			console.log('*****************');
			console.log($scope.activeElementIndex);
			console.log(project.elements[$scope.activeElementIndex]);
			//Take the first selected file
			fd.append('file', files[0]);

			$http.post('/public/uploads', fd, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			})
			.success( function(data, status, headers, config, statusText) {
				console.log(data);
				var filepath = data;
				project.elements[$scope.activeElementIndex] = {tag: project.elements[$scope.activeElementIndex].tag, value: filepath.data.replace('public/', '').replace('\\', '/')};
				project.$update(function() {
					//$location.path('projects/' + project._id);
          			$state.go('home.viewProject',{projectId:project._id},{reload:true});
				},
				function(errorResponse) {
					$scope.error = errorResponse.data.message;
					});
				}
			);
		};

		// allows user to upload a file
		$scope.uploadFile = function(files, indicator) {
			$scope.addContributer();
			var project = $scope.project;
			var my_index = get_insert_index(project);
			var fd = new FormData();
			//Take the first selected file
			fd.append('file', files[0]);
			//console.log(files[0].name);
			//console.log(files[0].type);
			$http.post('/public/uploads', fd, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			})
			.success( function(data, status, headers, config, statusText) {
				//console.log(data);
				var filepath = data;
				var tag_type = '';
				if(indicator === 0)
					tag_type = 'image';
				else if(indicator === 1)
					tag_type = 'video';
				else if(indicator === 2)
					tag_type = 'audio';
				project.elements.push({tag: tag_type, value: filepath.data.replace('public/', '').replace('\\', '/'), isEditing: false, index: my_index, showMedia: $scope.showMedia});
				project.$update(function() {
					//$location.path('projects/' + project._id);
          			$state.go('home.viewProject',{projectId:project._id});
				},
				function(errorResponse) {
					$scope.error = errorResponse.data.message;
					});
				}
			);
		};
		
		// allows user to embed a file
		$scope.embedFile = function(indicator) {
			$scope.addContributer();
			var project = $scope.project;
			var my_index = get_insert_index(project);

			var tag_type = '';

			if(indicator === 0)	tag_type = 'image';
			else if(indicator === 1) tag_type = 'video';
			else if(indicator === 2) tag_type = 'audio';

			project.elements.push({tag: tag_type, value: $scope.videoEmbed, isEditing: false, index: my_index, isEmbedded: true, showMedia: $scope.showMedia});

			project.$update(function() {
				$state.go('home.viewProject',{projectId:project._id});
				$scope.textToAppend = '';
			},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Adds a level to the hierarchy. curr_level corresponds to the level of the hierarchy
		// Project-1, Course-2, Topic-3, etc.
		$scope.addLevel = function(curr_level) {
			$scope.addContributer();
			var parent_proj = $scope.project;
			var curr_proj;
			if(curr_level === -1){		/* Inserting a quiz into the hierarchy! Make it fit into this spot no matter what */
				curr_level = parent_proj.level+1;
					curr_proj = new Projects({
					title: this.title,
					content: this.content,
					parent: parent_proj._id,
					level: curr_level,
					reports: [],
					isQuiz: true
				});
			}
			else{
				if(parent_proj.level+1 !== curr_level){
					$scope.error = 'Cannot insert a ' + get_hierarchy_name(curr_level) + ' under a ' + get_hierarchy_name(parent_proj.level) + '!';
					return;
				}
				curr_proj = new Projects({
					title: this.title,
					content: this.content,
					parent: parent_proj._id,
					level: curr_level,
				});
			}
			parent_proj.children.push(curr_proj);

			parent_proj.$update(function(){
				curr_proj.$save(function(response) {
					//$location.path('projects/' + response._id);
          			$state.go('home.viewProject',{projectId:response._id},{reload:true});

					$scope.title = '';
					$scope.content = '';
				},function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			});
		};
		
		// returns the hierachy name
		function get_hierarchy_name(level){
			if(level === 1)
				return 'Project';
			else if(level === 2)
				return 'Course';
			else if(level === 3)
				return 'Topic';
			else if(level === 4)
				return 'Concept';
			else if(level === 5)
				return 'Section';
			else if(level === 6)
				return 'Subsection';
			else if(level === 7)
				return 'Quiz';
		}
		
		// updates the project
		$scope.update = function() {
			$scope.addContributer();
			var project = $scope.project;

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject',{projectId:project._id},{reload:true});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		
		// finds list of the projects
		$scope.find = function() {
			$scope.projects = Projects.query();

		};
		
		// looks for a single project 
		$scope.findOne = function() {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});

		};

		// looks for a single project
		$scope.findOne_report = function() {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});
		};

		// returns a certain type of user
		$scope.getUniqueUsers = function(report){
			var ret = [report[0].student];
			for(var i = 1; i < report.length; ++i){
				var add = true;
				for(var j = 0; j < ret. length; ++j){
					if(ret[j] === report[i].student)
						add = false;
				}
				if(add){
					ret.push(report[i].student);
				}
			}
			return ret;
		};

		// find an element in the project
		$scope.findElement = function() {
			var url = $location.path();
			$scope.activeElementIndex = url.substring(url.lastIndexOf('/') + 1, url.length);
		};

		// converts it to a string
		$scope.to_string = function(proj){
			return JSON.stringify(proj, null, 2);
		};

		// displays the answers
		$scope.printAnswers = function(answers){
			var ret = answers[0];
			for(var i = 1; i < answers.length; ++i){
				ret += ', ';
				ret += answers[i];
			}
			return ret;
		};

		// shows whether or not the result is correct
		$scope.printResult = function(result){
			if(result)
				return 'Correct';
			else
				return 'Incorrect';
		};

		// when element is dropped it is updated and checked to see if it is in a correct place
		$scope.onDropComplete = function (start_element, end_element, evt) {

			//console.log(start_element);
			//console.log(end_element);

			var elements = $scope.project.elements;
			var const_elements = $scope.project.elements;

			var start_index = start_element.index;
			var end_index = end_element.index;

			/*
			console.log(start_index);
			console.log(end_index);
			console.log(elements);
			console.log(start_element);
			console.log(end_element);
			*/

			console.log('\n\npre');
			console.log(elements[0].value + ' :: index: ' + elements[0].index);
			console.log(elements[1].value + ' :: index: ' + elements[1].index);

			for (var i = 0; i !== elements.length; ++i)
			{
				if (start_index < end_index)
				{
					if (elements[i].index > start_index && elements[i].index <= end_index)
					{
						elements[i].index = elements[i].index - 1;
					}
				}
				else if (start_index > end_index)
				{
					if (elements[i].index < start_index && elements[i].index >= end_index)
					{
						elements[i].index = elements[i].index + 1;
					}
				}
			}

			start_element.index = end_index;

			$scope.project.$update(function() {
				//$location.path('projects/' + $scope.project._id);
        		$state.go('home.viewProject',{projectId:$scope.project._id},{reload:true});
			},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			console.log('\npost');
			console.log(elements[0].value + ' :: index: ' + elements[0].index);
			console.log(elements[1].value + ' :: index: ' + elements[1].index);
		};

		// returns the element selected
		function get_element(elements, index)
		{
			var length = elements.length;
			for (var i = 0; i !== length; ++i)
			{
				if (elements[i].index === index) {
					return elements[i];
				}
			}

			return false;
		}
		  //allows user to drag an element
		$scope.canDrag = function(element)
		{
			return $scope.canEdit() && !element.isEditing;
		};

		// the function with the magic
		$scope.openProjectModal  = function (projectId, elementId) {
			var modalInstance = $modal.open({
				templateUrl: 'modules/projects/views/modals/project-modal.client.view.html',
				controller: 'LinkModalController',
				size: 'lg',
				resolve: {
					prjId: function() {
						return projectId;
					},
					eleId: function() {
						return elementId;
					}
				}
			});
		};

		// changes all hash links (<a href='#foo'></a>) to call a scroll function
		// meant to be used with the wait-until-loaded directive
		$scope.replaceHashLinks = function() {
			// gotoId is used to smoothly scroll to the appropriate element id
			// id is defined by targetHash which is set onto the anchor id
			function gotoId(evt) {
				var id = evt.target.targetHash;  // retrieve the id from the targetHash attribute

				// find the current position on the page
				function currentYPos() {
					// Firefox, Chrome, Safari
					if(document.documentElement.scrollTop) return document.documentElement.scrollTop;
					// Internet Explorer 6, 7, 8
					if(document.body.scrollTop) return document.body.scrollTop;
					return 0;
				}

				// find the position of the element we want to scroll to
				function elemYPos(id) {
					var offset = 60;  // offset for the menu bar
					var elem = document.getElementById(id);
					if(!elem) return 0;  // if element not found, return 0
					var y = elem.offsetTop;
					var node = elem;
					while(node.offsetParent && node.offsetParent !== document.body) {
						node = node.offsetParent;
						y += node.offsetTop;
					}
					if(y - offset < 0) return 0;
					return y - offset;
				}

				var startY = currentYPos();
				var stopY = elemYPos(id);
				//console.log('startY: '+startY+' stopY: '+stopY);
				var distance = stopY > startY ? stopY - startY : startY - stopY;
				if(distance < 100) {
					scrollTo(0, stopY);
					return;
				}
				var speed = Math.round(distance / 100);
				if(speed >= 20) speed = 20;
				var step = Math.round(distance / 25);
				var leapY = stopY > startY ? startY + step : startY - step;
				var timer = 0;
				if(stopY > startY) {
					for(var i = startY; i < stopY; i+=step) {
						setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
						leapY += step;
						if(leapY > stopY) leapY = stopY;
						timer++;
					}
				} else {
					for(var j = startY; j > stopY; j-=step) {
						setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
						leapY -= step;
						if(leapY < stopY) leapY = stopY;
						timer++;
					}
				}
			}

			// function that waits until all elements are loaded and then
			// replaces all <a href="#foo"></a> with <a id="anchorToFoo"></a>
			// and creates an eventListener that will execute gotoId when clicked
			$timeout(function() {
				var links = document.getElementsByTagName('a');  // get all links
				for( var i = 0; i < links.length; i++ ) {
					var str = links[i].href;
					// check for the # sign, however skip the #!
					if(str.indexOf('#!') === -1 && str.indexOf('#') !== -1) {
						// extract hash name
						str = str.substring(str.indexOf('#')+1);
						if(str) {  // make sure it is not blank
							// remove href attribute
							links[i].removeAttribute('href');
							// set the id
							links[i].setAttribute('id', 'anchorTo_'+str);
							// create an EventListener to run a custom scrolling function
							links[i].addEventListener('click', gotoId, false);
							// set the target attribute (where to scroll to)
							links[i].targetHash = str;
						}
					}
				}
			}, 0);
		};

		// export function
		// elements supported: text, equation, table, image, video, audio
		// multimedia is referenced from localhost:3000
		$scope.saveHTML = function()
		{
			// get the project
			var project = Projects.get({ projectId: $stateParams.projectId }, function() {
				// create savedHTML that will store the exported HTML of the course
				$scope.savedHTML =	'<!DOCTYPE html>\n' + 
									'<html lang="en" xmlns="http://www.w3.org/1999/xhtml">\n' + 
									'<head>\n' +
									'  <title>' + project.title + '</title>\n' +
									'  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">\n' + 
									'  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">\n\n' + 
									'</head>\n' + 
									'<body>\n' + 
									'<section class="container">\n' + 
								 	'  <div class="page-header">\n' + 
								 	'    <h1>' + project.title + '</h1>\n' +
								 	'    <small>' + project.content + '</small>\n' + 
								 	'  </div>\n' + 
								 	'  <div class="row">\n' + 
								 	'    <div class="col-md-10">\n';

				// add elements
				// supported elements: text, images (relative to host), videos (relative to host and youtube), audio (relative to host), 
				// 					   equations, and tables
				var mediaHost = 'http://localhost:3000/';
				var tabs = '        '; // used to for multi-line elements to keep spacing the same
				for(var i = 0; i < project.elements.length; i++) {
					$scope.savedHTML += '      <div>\n        ';
					switch(project.elements[i].tag) {
						case 'text':	
						case 'equation':
						case 'table':
										$scope.savedHTML += project.elements[i].value;
										break;
						case 'image':	$scope.savedHTML += '<img class="img-responsive" size="100%" src = "' + mediaHost + project.elements[i].value + '">\n' + 
															'<br>';
										break;
						case 'video':	/*$scope.savedHTML += '<div class="pull-left">\n' + 
													   tabs + '  <button class="btn btn-primary">\n' + 
													   tabs + '    <i class="glyphicon glyphicon-facetime-video"></i>\n' + 
													   tabs + '  </button>\n' +
													   tabs + '</div>\n';*/
										$scope.savedHTML += '<br>\n';
										if(project.elements[i].isEmbedded) {
											var path = project.elements[i].value.substring(project.elements[i].value.indexOf('v=') + 2);
											$scope.savedHTML += tabs + '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + path + '" frameborder="0" allowfullscreen></iframe>\n' + 
																tabs + '<br><br>';
										} else {
											$scope.savedHTML += tabs + '<video class="video" width="320" height="240" controls>\n' + 
																tabs + '  <source src="' + mediaHost + project.elements[i].value + '" type="video/mp4">\n' + 
																tabs + '</video>\n' + 
																tabs + '<br><br>\n';
										}
										break;
						case 'audio':	$scope.savedHTML += '<audio class="audio" controls>\n' + 
							  						 tabs + '  <source src="' + mediaHost + project.elements[i].value + '" type="audio/mpeg">\n' + 
													 tabs + '</audio>';
										break;
					}
					$scope.savedHTML += '\n      </div>\n';
				}
				$scope.savedHTML +=	'    </div>\n' + 
									'  </div>\n' + 
									'</section>\n' + 
									'</body>\n' + 
									'</html>\n';

				// create blob and then serve it as a file download
				var filename = 'exported_course.html';
				var blob = new Blob([ $scope.savedHTML ], { type: 'text/plain' });
				// if IE call its function
				if(/\bMSIE\b|\bTrident\b|\bEdge\b/.test(navigator.userAgent)) {
					window.navigator.msSaveOrOpenBlob(blob, filename);
				} else {
					// if not IE, create an anchor tag and click it
					var link = document.createElement('a');
					var url = (window.URL || window.webkitURL).createObjectURL( blob );
					link.href = $scope.sc.trustAsResourceUrl( url );
					link.download = filename;
					link.click();
					(window.URL || window.webkitURL).revokeObjectURL( blob );
				}

				// remove topbar
				var element = document.getElementsByTagName('header');
				element[0].parentNode.removeChild(element[0]);
				element = document.getElementsByTagName('section');
				element[0].className = '';
			});
		};
	}
]);
