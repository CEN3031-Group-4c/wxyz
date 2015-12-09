describe('WXYZ - Course Authoring System', function() {
	var path = require('path');
	var absolutePath = '';
	var fileToUpload = '';
	var last_element;
	var ckEditorButton = function(button) {
		element.all(by.css('.cke_button')).then(function(btn) {
			btn[button].click();
		});
	};
	
	it('Start the browser', function(){
		browser.get('http://localhost:3000/');
        browser.driver.manage().window().maximize();
        browser.sleep(500);
	});
	
	it('Create a user account using the default signin', function() {
		element(by.name('signUpButton')).click(); // click the signup button
		element(by.id('initialusername')).sendKeys('Admin'); // type the default username
		element(by.id('initialpassword')).sendKeys('12341234'); // type the default password
		element(by.name('firstName')).sendKeys('Igor11'); // type the first name
		element(by.name('lastName')).sendKeys('Igor11'); // type the last name
		element(by.name('email')).sendKeys('igor11@email.com'); // type the email
		element(by.id('username')).sendKeys('igor11'); // type the username
		element(by.id('password')).sendKeys('tiramisu'); // type the password
		browser.sleep(500);
		element(by.name('signUpSubmit')).click(); // click signup button
	});
	
	/*
	it('Sign In', function(){
		var user = '';
		var password = '';
		element(by.name('signInButton')).click(); // click the signin button
		element(by.name('username')).sendKeys(user); // type the username
		element(by.name('password')).sendKeys(password); // type the password
		expect(element(by.name('username')).getAttribute('value')).toEqual(user); // check the username
		expect(element(by.name('password')).getAttribute('value')).toEqual(password); // check the password
		element(by.name('signIn')).click(); // click signin button
	});*/
	
	
	it('Create Project', function(){
		element.all(by.repeater('item in menu.items').row(0)).click();
		element.all(by.repeater('subitem in item.items').row(0)).click();
		element(by.name('title')).sendKeys('Project 1');
		element(by.name('content')).sendKeys('This is an automated test of project creation.');
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Project 1');
		expect(element(by.name('content')).getAttribute('value')).toEqual('This is an automated test of project creation.');
		element(by.name('submitButton')).click();
		
		expect(element.all(by.repeater('project in projects.slice().reverse()')).last().getAttribute('heading')).toEqual('Project 1');
	});
	
	it('Create Course', function(){
		element.all(by.repeater('project in projects.slice().reverse()')).last().click();
		element.all(by.repeater('item in menu.items').row(2)).click();
		element.all(by.repeater('subitem in item.items').row(11)).click();
		element(by.name('title')).sendKeys('Course 1');
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Course 1');
		element(by.name('submitButton')).click();
	});
	
	
	it('Add Elements', function(){
		element.all(by.repeater('project in projects.slice().reverse()')).last().click();
		
		// text
		element(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(19)).click();
		browser.sleep(2000);
		
		ckEditorButton(20); // center
		
		browser.switchTo().frame(0);
		browser.driver.findElement(by.tagName('body')).click();
		browser.driver.findElement(by.tagName('body')).sendKeys('Text 1');
		browser.driver.switchTo().defaultContent();
		browser.waitForAngular();
		
		element(by.name('submit')).click();
		browser.sleep(2000);
		
		last_element = element.all(by.repeater('element in project.elements')).last();
		expect(last_element.element(by.css('.ng-binding')).getInnerHtml()).
			toBe('<p style="text-align:center">Text 1</p>\n');
		
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
		
		// youtube
		element(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(20)).click();
		element(by.model('showMedia')).click();
		element(by.model('videoEmbed')).sendKeys('https://www.youtube.com/watch?v=rlVwJvE3C5A');
		expect(element(by.model('videoEmbed'))).toBe('https://www.youtube.com/watch?v=rlVwJvE3C5A');
		element(by.name('submit')).click();
		browser.sleep(500);
		last_element = element.all(by.repeater('element in project.elements')).last();
		expect(last_element.element(by.tagName('iframe')).isPresent()).toBe(true);
		
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
		
	});
	
	it('Remove an Element', function(){
		// delete the last element
		// open the last project
		element.all(by.repeater('project in projects.slice().reverse()')).last().click();
		// get number of elements and subtract one
		element.all(by.repeater('element in project.elements')).count().then(function(oldCount) {
			// find the last element
			last_element = element.all(by.repeater('element in project.elements')).last();
			// click delete and confirm
			last_element.element(by.name('elementDeleteButton')).click();
			element(by.name('confirmDeleteButton')).click();
			browser.sleep(300);
			// get the new number of elements
			element.all(by.repeater('element in project.elements')).count().then(function(newCount) {
				expect(newCount).toBe(oldCount-1);
			});
		});
	});
});