'use strict';
// Setting up route
angular.module('projects').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('createProject', {
			url: '/projects/new',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@createProject': { templateUrl: 'modules/projects/views/create-views/create-project.client.view.html' }
			}
		}).
		state('openProject', {
			url: '/projects',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@openProject': { templateUrl: 'modules/projects/views/list-projects.client.view.html' }
			}
		}).
		state('recentProject', {
			url: '/recent',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@recentProject': { templateUrl: 'modules/projects/views/list-recent-projects.client.view.html' }
			}
		}).
		state('viewProject', {
			url: '/projects/:projectId',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@viewProject': { templateUrl: 'modules/projects/views/view-views/view-project.client.view.html' },
				'mainFrame2@viewProject': { templateUrl: 'modules/projects/views/view-views/view-json.client.view.html' },
				'mainFrame3@viewProject': { templateUrl: 'modules/projects/views/view-views/view-html.client.view.html' }
			}
		}).
		state('editProject', {
			url: '/projects/:projectId/editProject',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@editProject': { templateUrl: 'modules/projects/views/edit-project.client.view.html' }
			}
		}).
		state('permissionsProject', {
			url: '/projects/:projectId/permissions',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@permissionsProject': { templateUrl: 'modules/projects/views/permissions.client.view.html' }
			}
		}).
		state('newCourse', {
			url: '/projects/:projectId/new-course',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@newCourse': { templateUrl: 'modules/projects/views/create-views/create-course.client.view.html' }
			}
		}).
		state('imageProject', {
			url: '/projects/:projectId/add-image',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@imageProject': { templateUrl: 'modules/projects/views/image-project.client.view.html' }
			}
		}).
		state('graphProject', {
			url: '/projects/:projectId/add-graph',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@graphProject': { templateUrl: 'modules/projects/views/chart-project.client.view.html' }
			}
		}).
		state('animationProject', {
			url: '/projects/:projectId/add-animation',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@animationProject': { templateUrl: 'modules/projects/views/animation-project.client.view.html' }
			}
		}).
		state('equationProject', {
			url: '/projects/:projectId/add-equation',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@equationProject': { templateUrl: 'modules/projects/views/equation-project.client.view.html' }
			}
		}).
		state('quizProject', {
			url: '/projects/:projectId/add-question',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@quizProject': { templateUrl: 'modules/projects/views/quiz-project.client.view.html' }
			}
		}).
		state('editTextProject', {
			url: '/projects/:projectId/edit-text/:elementIndex',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@editTextProject': { templateUrl: 'modules/projects/views/edit-element-views/edit-text-article.client.view.html' }
			}
		}).
		state('editFileProject', {
			url: '/projects/:projectId/edit-file/:elementIndex',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@editFileProject': { templateUrl: 'modules/projects/views/edit-element-views/edit-file-article.client.view.html' }
			}
		}).
		state('videoProject', {
			url: '/projects/:projectId/add-video',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@videoProject': { templateUrl: 'modules/projects/views/video-project.client.view.html' }
			}
		}).
		state('audioProject', {
			url: '/projects/:projectId/add-audio',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@audioProject': { templateUrl: 'modules/projects/views/audio-project.client.view.html' }
			}
		}).
		state('newTopic', {
			url: '/projects/:projectId/new-topic',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@newTopic': { templateUrl: 'modules/projects/views/create-views/create-topic.client.view.html' }
			}
		}).
		state('newConcept', {
			url: '/projects/:projectId/new-concept',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@newConcept': { templateUrl: 'modules/projects/views/create-views/create-concept.client.view.html' }
			}
		}).
		state('newSection', {
			url: '/projects/:projectId/new-section',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@newSection': { templateUrl: 'modules/projects/views/create-views/create-section.client.view.html' }
			}
		}).
		state('newSubsection', {
			url: '/projects/:projectId/new-subsection',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@newSubsection': { templateUrl: 'modules/projects/views/create-views/create-subsection.client.view.html' }
			}
		}).
		state('newQuiz', {
			url: '/projects/:projectId/new-quiz',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@newQuiz': { templateUrl: 'modules/projects/views/create-views/create-quiz.client.view.html' }
			}
		}).
		state('textProject', {
			url: '/projects/:projectId/insert/add-text',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@textProject': { templateUrl: 'modules/projects/views/text-project.client.view.html' }
			}
		}).
		state('scoreReport', {
			url: '/projects/:projectId/scoreReport',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@scoreReport': { templateUrl: 'modules/projects/views/view-views/scoreReport.client.view.html' }
			}
		}).
		state('sortByQuestions', {
			url: '/projects/:projectId/scoreReport/questions',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@sortByQuestions': { templateUrl: 'modules/projects/views/view-views/scoreReport_questions.client.view.html' }
			}
		}).
		state('sortByStudents', {
			url: '/projects/:projectId/scoreReport/students',
			views: {
				'': {templateUrl: 'modules/core/views/home.client.view.html' },
				'mainFrame@sortByStudents': { templateUrl: 'modules/projects/views/view-views/scoreReport_students.client.view.html' }
			}
		}).
		state('dragDropTest', {
			url: '/dragdrop',
			templateUrl: 'modules/projects/views/drag-drop.client.view.html'
		}).
		state('previewProject', {
			url: '/projects/:projectId/preview',
			views: {
				'': {templateUrl: 'modules/core/views/preview-home.client.view.html' },
				'mainFrame@previewProject': { templateUrl: 'modules/projects/views/view-views/view-project.client.view.html' }
			}
		});
	}

]);
