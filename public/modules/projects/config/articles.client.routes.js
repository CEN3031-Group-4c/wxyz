'use strict';
// Setting up route
angular.module('projects').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('home.createProject', {
			url: 'projects/new',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/create-views/create-project.client.view.html' }
			}
		}).
		state('home.openProject', {
			url: 'projects',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/list-projects.client.view.html' }
			}
		}).
		state('home.recentProject', {
			url: 'recent',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/list-recent-projects.client.view.html' }
			}
		}).
		state('home.viewProject', {
			url: 'projects/:projectId',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/view-views/view-project.client.view.html' },
				'mainFrame2': { templateUrl: 'modules/projects/views/view-views/view-json.client.view.html' },
				'mainFrame3': { templateUrl: 'modules/projects/views/view-views/view-html.client.view.html' }
			}
		}).
		state('home.editProject', {
			url: 'projects/:projectId/editProject',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/edit-project.client.view.html' }
			}
		}).
		state('home.permissionsProject', {
			url: 'projects/:projectId/permissions',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/permissions.client.view.html' }
			}
		}).
		state('home.newCourse', {
			url: 'projects/:projectId/new-course',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/create-views/create-course.client.view.html' }
			}
		}).
		state('home.imageProject', {
			url: 'projects/:projectId/add-image',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/image-project.client.view.html' }
			}
		}).
		state('home.graphProject', {
			url: 'projects/:projectId/add-graph',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/chart-project.client.view.html' }
			}
		}).
		state('home.animationProject', {
			url: 'projects/:projectId/add-animation',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/animation-project.client.view.html' }
			}
		}).
		state('home.equationProject', {
			url: 'projects/:projectId/add-equation',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/equation-project.client.view.html' }
			}
		}).
		state('home.quizProject', {
			url: 'projects/:projectId/add-question',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/quiz-project.client.view.html' }
			}
		}).
		state('home.editTextProject', {
			url: 'projects/:projectId/edit-text/:elementIndex',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/edit-element-views/edit-text-article.client.view.html' }
			}
		}).
		state('home.editFileProject', {
			url: 'projects/:projectId/edit-file/:elementIndex',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/edit-element-views/edit-file-article.client.view.html' }
			}
		}).
		state('home.addLinkButton', {
			url: 'projects/:projectId/addlinkButton',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/linkButton-project.client.view.html' }
			}
		}).
		state('home.tableProject', {                 //state for creating/inserting table elements.
			url: 'projects/:projectId/tableProject',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/table-project.client.view.html' }
			}
		}).
		state('home.videoProject', {
			url: 'projects/:projectId/add-video',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/video-project.client.view.html' }
			}
		}).
		state('home.audioProject', {
			url: 'projects/:projectId/add-audio',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/audio-project.client.view.html' }
			}
		}).
		state('home.newTopic', {
			url: 'projects/:projectId/new-topic',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/create-views/create-topic.client.view.html' }
			}
		}).
		state('home.newConcept', {
			url: 'projects/:projectId/new-concept',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/create-views/create-concept.client.view.html' }
			}
		}).
		state('home.newSection', {
			url: 'projects/:projectId/new-section',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/create-views/create-section.client.view.html' }
			}
		}).
		state('home.newSubsection', {
			url: 'projects/:projectId/new-subsection',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/create-views/create-subsection.client.view.html' }
			}
		}).
		state('home.newQuiz', {
			url: 'projects/:projectId/new-quiz',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/create-views/create-quiz.client.view.html' }
			}
		}).
		state('home.textProject', {
			url: 'projects/:projectId/insert/add-text',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/text-project.client.view.html' }
			}
		}).
		state('home.scoreReport', {
			url: 'projects/:projectId/scoreReport',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/view-views/scoreReport.client.view.html' }
			}
		}).
		state('home.sortByQuestions', {
			url: 'projects/:projectId/scoreReport/questions',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/view-views/scoreReport_questions.client.view.html' }
			}
		}).
		state('home.sortByStudents', {
			url: 'projects/:projectId/scoreReport/students',
			views: {
				'mainFrame': { templateUrl: 'modules/projects/views/view-views/scoreReport_students.client.view.html' }
			}
		}).
		state('home.publish', {
			url: 'projects/:projectId/publish',
			views: {
				'@': { templateUrl: 'modules/projects/views/publish-project.client.view.html' }//,
				//'mainFrame@home.publish': {  }
			}
		})
		//state('dragDropTest', {
			//url: '/dragdrop',
			//templateUrl: 'modules/projects/views/drag-drop.client.view.html'
		//}).
		.state('home.previewProject', {
			url: 'projects/:projectId/preview',
			views: {
				'@':{templateUrl: 'modules/core/views/preview-home.client.view.html'},
				'mainFrame@home.previewProject': { templateUrl: 'modules/projects/views/view-views/view-project.client.view.html' }
			}
		});
	}

]);
