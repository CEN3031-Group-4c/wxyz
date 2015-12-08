describe('WXYZ - Course Authoring System', function() {
	var path = require('path');
	var absolutePath = '';
	var fileToUpload = '';
	var last_element;
	
	it('Start the browser', function(){
		browser.get('http://localhost:3000/');
        browser.driver.manage().window().maximize();
        browser.sleep(500);
	});
	
	it('Sign In', function(){
		element(by.name('signInButton')).click();
		element(by.name('username')).sendKeys('igor');
		element(by.name('password')).sendKeys('tiramisu');
		
		expect(element(by.name('username')).getAttribute('value')).toEqual('igor');
		expect(element(by.name('password')).getAttribute('value')).toEqual('tiramisu');
		
		element(by.name('signIn')).click();
	});
	
	/*it('Create Project', function(){
		element.all(by.repeater('item in menu.items').row(0)).click();
		element.all(by.repeater('subitem in item.items').row(0)).click();
		element(by.name('title')).sendKeys('Project 1');
		element(by.name('content')).sendKeys('This is an automated test of project creation.');
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Project 1');
		expect(element(by.name('content')).getAttribute('value')).toEqual('This is an automated test of project creation.');
		element(by.name('submitButton')).click();
		
		expect(element.all(by.repeater('project in projects.slice().reverse()')).last().getAttribute('heading')).toEqual('Project 1');
	});*/
	/*
	it('Create Course', function(){
		element.all(by.repeater('project in projects.slice().reverse()')).last().click();
		element.all(by.repeater('item in menu.items').row(2)).click();
		element.all(by.repeater('subitem in item.items').row(11)).click();
		element(by.name('title')).sendKeys('Course 1');
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Course 1');
		element(by.name('submitButton')).click();
	});*/
	
	it('Add Elements', function(){
		element.all(by.repeater('project in projects.slice().reverse()')).last().click();
		
		// text
		element(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(19)).click();
		browser.sleep(2000);
		
		var edit = $('span[role="application"]');
		console.log(edit.length);
		var editor = element(by.css('.cke'));
		console.log(editor.length);
		expect(editor.isPresent()).toBe(true);
		//var toolbar = editor.element.all(by.css('.cke_toolgroup'));
		//toolbar[3].element.all(by.css('.cke_button'));
		//element.all(by.css('.cke_button'));
		
		browser.switchTo().frame(0);
		browser.driver.findElement(by.tagName('body')).click();
		browser.driver.findElement(by.tagName('body')).sendKeys('Text 1');
		browser.driver.switchTo().defaultContent();
		browser.waitForAngular();
		
		//element(by.name('submit')).click();
		//browser.sleep(2000);
		
		//last_element = element.all(by.repeater('element in project.elements')).last();
		//expect(last_element.element(by.css('.ng-binding')).getInnerHtml()).toBe('<p>Text 1</p>\n');
		/*
		//audio
		element(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(23)).click();
		fileToUpload = '../test_elements/audio_test.mp3';
		absolutePath = path.resolve(__dirname, fileToUpload);
		$('input[type="file"]').sendKeys(absolutePath);
		browser.sleep(500);
		last_element = element.all(by.repeater('element in project.elements')).last();
		expect(last_element.element(by.tagName('audio')).isPresent()).toBe(true);
		
		//video
		element(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(20)).click();
		fileToUpload = '../test_elements/video_test.mp4';
		absolutePath = path.resolve(__dirname, fileToUpload);
		element(by.model('showMedia')).click();
		$('input[type="file"]').sendKeys(absolutePath);
		browser.sleep(500);
		last_element = element.all(by.repeater('element in project.elements')).last();
		expect(last_element.element(by.tagName('video')).isPresent()).toBe(true);
		
		//static image (jpg)
		element(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(25)).click();
		fileToUpload = '../test_elements/dog_pic.jpg';
		absolutePath = path.resolve(__dirname, fileToUpload);
		$('input[type="file"]').sendKeys(absolutePath);
		browser.sleep(500);
		
		last_element = element.all(by.repeater('element in project.elements')).last();
		expect(last_element.element(by.tagName('img')).isPresent()).toBe(true);
		
		//static image (gif)
		element(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(25)).click();
		fileToUpload = '../test_elements/gif_test.gif';
		absolutePath = path.resolve(__dirname, fileToUpload);
		$('input[type="file"]').sendKeys(absolutePath);
		browser.sleep(500);
		
		last_element = element.all(by.repeater('element in project.elements')).last();
		expect(last_element.element(by.tagName('img')).isPresent()).toBe(true);
		*/
	});
});