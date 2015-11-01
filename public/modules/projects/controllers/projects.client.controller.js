'use strict';

var myApp = angular.module('projects').controller('ProjectsController', ['$scope','$rootScope', '$http', '$stateParams', '$location', '$upload', '$modal', '$sce', 'Authentication', 'Projects','$state',
	function($scope, $rootScope, $http, $stateParams, $location, $upload, $modal, $sce, Authentication, Projects, $state) {
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

		$scope.lookup = function(id)
		{
			var projects = $scope.projects;
			for (var i =0; i < projects.length; i++)
			{
				if (projects[i]._id === id) return projects[i];
			}
			return false;
		};
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
		$scope.addViewContributer = function (email) {
			var project = $scope.project;
			if (project.viewContributers.indexOf(email) === -1)
			{
				project.viewContributers.push(email);
			}
		};
		$scope.addEditContributer = function (email) {
			var project = $scope.project;
			if (project.editContributers.indexOf(email) === -1)
			{
				project.editContributers.push(email);
			}
		};
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


		$scope.addContributer = function () {
			var project = $scope.project;
			if (project.contributers.indexOf($scope.authentication.user._id) === -1)
			{
				project.contributers.push($scope.authentication.user._id);
			}
		};

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


		$scope.toggleEdit = function(element){
			element.isEditing = !element.isEditing;
		};

		$scope.cancelEdit = function(element) {
			$scope.findOne();
		};

		$scope.setActiveElement = function(element) {
			$scope.activeElementIndex = $scope.project.elements.indexOf(element);
		};

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


		$scope.deleteElement = function(element) {
			$scope.addContributer();
			var project = $scope.project;

			project.elements.splice(project.elements.indexOf(element),1);

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject',{projectId:project._id}, {reload:true});
				},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//this is a legacy function. Can remove if you want
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

		function removeProjects() {
			$scope.project.$remove(function() {
				$state.go('home.viewProject', {}, {reload:true});
			});
		}

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

		$scope.appendLink = function(targetURL){
			// $scope.addContributer();
			// var project = $scope.project;
			// var my_index = get_insert_index(project);
			// project.elements.push({tag: 'linkButton', value: targetURL, index: my_index});
			// project.$update(function() {
			// 	//$location.path('projects/' + project._id);
      //   		$state.go('home.viewProject', {projectId:project._id});
			//
			// },
			// function(errorResponse) {
			// 	$scope.error = errorResponse.data.message;
			// });

			$scope.addContributer();
			var project = $scope.project;

			var my_index = get_insert_index(project);

			project.elements.push({tag: 'linkButton', value: targetURL, index: my_index});

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject', {projectId:project._id});
				$scope.textToAppend = '';
			},
			function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.setGraphType = function(label){
			$scope.graphType = label;
			$scope.drawGraphPreview();
		};

        $scope.getGraphIndex = function(element){
            for(var i = 0; i< element.length; i++){
                if(element.heading === $scope.chartArray.options.title) return i;
            }
            return -1;
        };

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

		$scope.showFeedback = function(question, i) {
			for(var j = 0; j < question.responses.length; ++j){
				if(question.responses[j] === question.choices[i]){
					if(question.feedback[i] !== '')
						return true;
				}
			}
			return false;
		};

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

		$scope.questionTypeSelected = function(type) {
			$scope.questionType = type;
		};

		$scope.numberMultipleChoices = function(num) {
			$scope.numChoices = num;
			$scope.pickedMC = true;
			$scope.pickedMS = false;
		};

		/*$scope.getNumChoices = function(num) {
		    return numChoices;
		};*/

		$scope.numberMultipleSelections = function(num) {
			$scope.numSelections = num;
			$scope.pickedMS = true;
			$scope.pickedMC = false;
		};

		//$scope.number = 0;
		$scope.getNumber = function(num) {
		    return new Array(num);
		};

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
				project.elements[$scope.activeElementIndex] = {tag: project.elements[$scope.activeElementIndex].tag, value: filepath.data.replace('public/', '')};
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

		$scope.uploadFile = function(files, indicator) {
			$scope.addContributer();
			var project = $scope.project;
			var my_index = get_insert_index(project);
			var fd = new FormData();
			//Take the first selected file
			fd.append('file', files[0]);
			console.log(files[0].name);
			console.log(files[0].type);

			$http.post('/public/uploads', fd, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			})
			.success( function(data, status, headers, config, statusText) {
				console.log(data);
				var filepath = data;
				var tag_type = '';
				if(indicator === 0)
					tag_type = 'image';
				else if(indicator === 1)
					tag_type = 'video';
				else if(indicator === 2)
					tag_type = 'audio';
				project.elements.push({tag: tag_type, value: filepath.data.replace('public/', ''), isEditing: false, index: my_index});
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

		//Adds a level to the hierarchy. curr_level corresponds to the level of the hierarchy
		//Project-1, Course-2, Topic-3, etc.
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

		$scope.update = function() {
			$scope.addContributer();
			var project = $scope.project;

			project.$update(function() {
				//$location.path('projects/' + project._id);
        		$state.go('home.viewProject',{projectId:project._id});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.projects = Projects.query();
		};

		$scope.findOne = function() {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});
		};

		$scope.findOne_report = function() {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});
		};

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

		$scope.findElement = function() {
			var url = $location.path();
			$scope.activeElementIndex = url.substring(url.lastIndexOf('/') + 1, url.length);
		};

		$scope.to_string = function(proj){
			return JSON.stringify(proj, null, 2);
		};

		$scope.printAnswers = function(answers){
			var ret = answers[0];
			for(var i = 1; i < answers.length; ++i){
				ret += ', ';
				ret += answers[i];
			}
			return ret;
		};

		$scope.printResult = function(result){
			if(result)
				return 'Correct';
			else
				return 'Incorrect';
		};

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

		$scope.canDrag = function(element)
		{
			return $scope.canEdit() && !element.isEditing;
		};

		// the function with the magic
		$scope.openProjectModal  = function (projectId, elementId, size) {
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
	}
]);
