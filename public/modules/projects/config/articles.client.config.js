'use strict';

// Configuring the Articles module
angular.module('projects').run([ 'Menus',
	function(Menus) {		
		//File menu
		Menus.addMenuItem('topbar', 'File', 'file_menu', 'dropdown');
		Menus.addSubMenuItem('topbar', 'file_menu', 'New', 'projects/new');
		Menus.addSubMenuItem('topbar', 'file_menu', 'Open', 'projects');
		Menus.addSubMenuItem('topbar', 'file_menu', 'Save', 'articles');
		Menus.addSubMenuItem('topbar', 'file_menu', 'Save As', 'articles');
		Menus.addSubMenuItem('topbar', 'file_menu', 'Edit', 'editProject', true);
		Menus.addSubMenuItem('topbar', 'file_menu', 'Recent', 'recent');
		Menus.addSubMenuItem('topbar', 'file_menu', 'Preview', 'articles');
		Menus.addSubMenuItem('topbar', 'file_menu', 'Publish', 'articles');
		
		//View menu
		Menus.addMenuItem('topbar', 'View', 'view_menu', 'dropdown');
		Menus.addSubMenuItem('topbar', 'view_menu', '1-pane Canvas', 'articles');
		Menus.addSubMenuItem('topbar', 'view_menu', '2-pane IC/Display', 'articles');
		Menus.addSubMenuItem('topbar', 'view_menu', '3-pane Debug View', 'articles');
		
		//Create menu
		Menus.addMenuItem('topbar', 'Create', 'create_menu', 'dropdown');
		Menus.addSubMenuItem('topbar', 'create_menu', 'ICW Course', 'new-course', true);
		Menus.addSubMenuItem('topbar', 'create_menu', 'ICW Archive', 'articles');
		
		//Compose ICW Arch menu
		Menus.addMenuItem('topbar', 'ComposeICWArch', 'compose_menu', 'dropdown');
		Menus.addSubMenuItem('topbar', 'compose_menu', 'Course', 'new-course', true);
		Menus.addSubMenuItem('topbar', 'compose_menu', 'Topic', 'new-topic', true);
		Menus.addSubMenuItem('topbar', 'compose_menu', 'Concept', 'new-concept',true);
		Menus.addSubMenuItem('topbar', 'compose_menu', 'Section', 'new-section',true);
		Menus.addSubMenuItem('topbar', 'compose_menu', 'Subsection', 'new-subsection',true);
		Menus.addSubMenuItem('topbar', 'compose_menu', 'Quiz', 'new-quiz',true);
		Menus.addSubMenuItem('topbar', 'compose_menu', 'Scoring Report', 'scoreReport', true);
		
		//Insert Elements menu
		Menus.addMenuItem('topbar', 'Insert Elements', 'elements_menu', 'dropdown');
		Menus.addSubMenuItem('topbar', 'elements_menu', 'Text', 'insert/add-text', true);
		Menus.addSubMenuItem('topbar', 'elements_menu', 'Audio', 'add-audio', true);
		Menus.addSubMenuItem('topbar', 'elements_menu', 'Video', 'add-video', true);
		Menus.addSubMenuItem('topbar', 'elements_menu', 'Equation', 'add-equation', true);
		Menus.addSubMenuItem('topbar', 'elements_menu', 'Animation', 'add-animation', true);
		Menus.addSubMenuItem('topbar', 'elements_menu', 'Static Graph', 'add-graph', true);
		Menus.addSubMenuItem('topbar', 'elements_menu', 'Static Image', 'add-image', true);
		Menus.addSubMenuItem('topbar', 'elements_menu', 'Interactive Element', 'articles');
		Menus.addSubMenuItem('topbar', 'elements_menu', 'Quiz Element', 'add-question', true);
		
		//Review, Preview, Publish menus
		//Menus.addMenuItem('topbar', 'Review', 'review_menu');
		Menus.addMenuItem('topbar', 'Preview', 'preview');
		//Menus.addMenuItem('topbar', 'Publish', 'publish_menu');
		
		//testing for drag and drop
		
		//Menus.addMenuItem('topbar', 'DD', 'dragdrop');
		
	}
]);
