describe('Large Test', function() {
	var path = require('path');
	var absolutePath = '';
	var fileToUpload = '';
	var size = -1;
	
	it('Start the browser and things', function(){
		browser.get('http://localhost:3000/');
        browser.driver.manage().window().maximize();
        browser.sleep(500);
	});
	
    it('Create an admin user', function() {		
		element(by.name('signUpButton')).click();
		element(by.name('firstName')).sendKeys('Darth');
		element(by.name('lastName')).sendKeys('Vader');
		element(by.name('email')).sendKeys('Vader99@Empire.net');
		element(by.name('username')).sendKeys('DVader');
		element(by.name('password')).sendKeys('password');
		element(by.name('isAdmin')).click();
		
		expect(element(by.name('firstName')).getAttribute('value')).toEqual('Darth');
		expect(element(by.name('lastName')).getAttribute('value')).toEqual('Vader');
		expect(element(by.name('email')).getAttribute('value')).toEqual('Vader99@Empire.net');
		expect(element(by.name('username')).getAttribute('value')).toEqual('DVader');
		expect(element(by.name('password')).getAttribute('value')).toEqual('password');
		expect(element(by.name('isAdmin')).getAttribute('value')).toEqual('on');
		
		element(by.name('signUpSubmit')).click();
	});	
	
	
	it('Sign Out', function(){
		element(by.name('userDropDown')).click();
		browser.sleep(250);
		element(by.name('signOutButton')).click();
		browser.sleep(300);
	});
	
	it('Create another admin user', function() {		
		element(by.name('signUpButton')).click();
		element(by.name('firstName')).sendKeys('Dark');
		element(by.name('lastName')).sendKeys('Helmet');
		element(by.name('email')).sendKeys('Helmet@SpaceBalls.net');
		element(by.name('username')).sendKeys('DHelmet');
		element(by.name('password')).sendKeys('password');
		element(by.name('isAdmin')).click();
		
		expect(element(by.name('firstName')).getAttribute('value')).toEqual('Dark');
		expect(element(by.name('lastName')).getAttribute('value')).toEqual('Helmet');
		expect(element(by.name('email')).getAttribute('value')).toEqual('Helmet@SpaceBalls.net');
		expect(element(by.name('username')).getAttribute('value')).toEqual('DHelmet');
		expect(element(by.name('password')).getAttribute('value')).toEqual('password');
		expect(element(by.name('isAdmin')).getAttribute('value')).toEqual('on');
		
		element(by.name('signUpSubmit')).click();
	});	
	
	it('Sign In', function(){
		element(by.name('signInButton')).click();
		element(by.name('username')).sendKeys('DVader');
		element(by.name('password')).sendKeys('password');
		
		expect(element(by.name('username')).getAttribute('value')).toEqual('DVader');
		expect(element(by.name('password')).getAttribute('value')).toEqual('password');
		
		element(by.name('signIn')).click();
	});
	
	it('Create Project', function(){
		element.all(by.repeater('item in menu.items').row(0)).click();
		element.all(by.repeater('subitem in item.items').row(0)).click();
		element(by.name('title')).sendKeys('Project 1');
		element(by.name('content')).sendKeys('This is an automated test of project creation.');
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Project 1');
		expect(element(by.name('content')).getAttribute('value')).toEqual('This is an automated test of project creation.');
		element(by.name('submitButton')).click();
		size++;
	});
	
	
	it('Create the wrong element in the hierarchy, shouldn\'t work', function(){
		element.all(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(14)).click();
		element(by.name('title')).sendKeys('Topic 1');
		size++;
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Topic 1');
		element(by.name('submitButton')).click();
	});
	
	it('Create Course', function(){
		element(by.name('proj_title')).click();
		element.all(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(13)).click();
		element(by.name('title')).sendKeys('Course 1');
		size++;
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Course 1');
		element(by.name('submitButton')).click();
	});
	
	it('Create Topic', function(){
		element.all(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(14)).click();
		element(by.name('title')).sendKeys('Topic 1');
		size++;
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Topic 1');
		element(by.name('submitButton')).click();
	});
	
	it('Create Concept', function(){
		element.all(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(15)).click();
		element(by.name('title')).sendKeys('Concept 1');
		size++;
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Concept 1');
		element(by.name('submitButton')).click();
	});
	
	it('Create Section', function(){
		element.all(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(16)).click();
		element(by.name('title')).sendKeys('Section 1');
		size++;
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Section 1');
		element(by.name('submitButton')).click();
	});
	
	it('Create Subsection', function(){
		element.all(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(17)).click();
		element(by.name('title')).sendKeys('Subsection 1');
		size++;
		
		expect(element(by.name('title')).getAttribute('value')).toEqual('Subsection 1');
		element(by.name('submitButton')).click();
		element(by.name('proj_title')).click();
	});
	
	it('Create Two More Courses', function(){
		element(by.name('proj_title')).click();
		element.all(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(13)).click();
		element(by.name('title')).sendKeys('Course 2');
		expect(element(by.name('title')).getAttribute('value')).toEqual('Course 2');
		element(by.name('submitButton')).click();
		size++;
		
		element(by.name('proj_title')).click();
		element(by.name('proj_title')).click();
		element.all(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(13)).click();
		element(by.name('title')).sendKeys('Course 3');
		expect(element(by.name('title')).getAttribute('value')).toEqual('Course 3');
		element(by.name('submitButton')).click();
		size++;
		browser.sleep(1500);
	});
	
	it('Add Elements', function(){
		//audio
		element(by.repeater('item in menu.items').row(4)).click();
		element.all(by.repeater('subitem in item.items').row(21)).click();
		fileToUpload = './test_elements/audio_test.mp3';
		absolutePath = path.resolve(__dirname, fileToUpload);
		browser.sleep(2000);
		$('input[type="file"]').sendKeys(absolutePath);
		browser.sleep(500);
		
		//video
		element(by.repeater('item in menu.items').row(4)).click();
		element.all(by.repeater('subitem in item.items').row(22)).click();
		fileToUpload = './test_elements/video_test.mp4';
		absolutePath = path.resolve(__dirname, fileToUpload);
		$('input[type="file"]').sendKeys(absolutePath);
		browser.sleep(300);
		
		//static image (jpg)
		element(by.repeater('item in menu.items').row(4)).click();
		element.all(by.repeater('subitem in item.items').row(26)).click();
		fileToUpload = './test_elements/dog_pic.jpg';
		absolutePath = path.resolve(__dirname, fileToUpload);
		$('input[type="file"]').sendKeys(absolutePath);
		browser.sleep(300);
		
		//static image (gif)
		element(by.repeater('item in menu.items').row(4)).click();
		element.all(by.repeater('subitem in item.items').row(26)).click();
		fileToUpload = './test_elements/gif_test.gif';
		absolutePath = path.resolve(__dirname, fileToUpload);
		$('input[type="file"]').sendKeys(absolutePath);
	});
	
	it('Create Column Graph', function(){
		element(by.name('topic_title')).click();
		element(by.name('topic_title')).click();
		element(by.repeater('item in menu.items').row(4)).click();
		element.all(by.repeater('subitem in item.items').row(25)).click();
		
		element(by.name('title')).sendKeys('Test Column Graph');
		element(by.name('dataTitle')).sendKeys('Data Set');
		element(by.name('x-title')).sendKeys('Minutes');
		element(by.name('y-title')).sendKeys('Tests');
		expect(element(by.name('title')).getAttribute('value')).toEqual('Test Column Graph');
		expect(element(by.name('dataTitle')).getAttribute('value')).toEqual('Data Set');
		expect(element(by.name('x-title')).getAttribute('value')).toEqual('Minutes');
		expect(element(by.name('y-title')).getAttribute('value')).toEqual('Tests');
		
		element(by.name('xToAppend')).sendKeys('1');
		element(by.name('yToAppend')).sendKeys('4');
		expect(element(by.name('xToAppend')).getAttribute('value')).toEqual('1');
		expect(element(by.name('yToAppend')).getAttribute('value')).toEqual('4');
		element(by.name('addPoint')).click();
		
		element(by.name('xToAppend')).sendKeys('2');
		element(by.name('yToAppend')).sendKeys('1');
		expect(element(by.name('xToAppend')).getAttribute('value')).toEqual('2');
		expect(element(by.name('yToAppend')).getAttribute('value')).toEqual('1');
		element(by.name('addPoint')).click();
		
		element(by.name('xToAppend')).sendKeys('3');
		element(by.name('yToAppend')).sendKeys('5');
		expect(element(by.name('xToAppend')).getAttribute('value')).toEqual('3');
		expect(element(by.name('yToAppend')).getAttribute('value')).toEqual('5');
		element(by.name('addPoint')).click();
		
		element(by.name('xToAppend')).sendKeys('4');
		element(by.name('yToAppend')).sendKeys('4');
		expect(element(by.name('xToAppend')).getAttribute('value')).toEqual('4');
		expect(element(by.name('yToAppend')).getAttribute('value')).toEqual('4');
		element(by.name('addPoint')).click();
		
		element(by.name('signUpSubmit')).click();
	});
	
	it('Create Line Graph', function(){
		element(by.name('topic_title')).click();
		element(by.name('topic_title')).click();
		element(by.repeater('item in menu.items').row(4)).click();
		element.all(by.repeater('subitem in item.items').row(25)).click();
		element(by.id('graph2')).click();
		
		element(by.name('title')).sendKeys('Test Line Graph');
		element(by.name('dataTitle')).sendKeys('Data Set');
		element(by.name('x-title')).sendKeys('Minutes');
		element(by.name('y-title')).sendKeys('Tests');
		expect(element(by.name('title')).getAttribute('value')).toEqual('Test Line Graph');
		expect(element(by.name('dataTitle')).getAttribute('value')).toEqual('Data Set');
		expect(element(by.name('x-title')).getAttribute('value')).toEqual('Minutes');
		expect(element(by.name('y-title')).getAttribute('value')).toEqual('Tests');
		
		element(by.name('xToAppend')).sendKeys('1');
		element(by.name('yToAppend')).sendKeys('4');
		expect(element(by.name('xToAppend')).getAttribute('value')).toEqual('1');
		expect(element(by.name('yToAppend')).getAttribute('value')).toEqual('4');
		element(by.name('addPoint')).click();
		
		element(by.name('xToAppend')).sendKeys('2');
		element(by.name('yToAppend')).sendKeys('1');
		expect(element(by.name('xToAppend')).getAttribute('value')).toEqual('2');
		expect(element(by.name('yToAppend')).getAttribute('value')).toEqual('1');
		element(by.name('addPoint')).click();
		
		element(by.name('xToAppend')).sendKeys('3');
		element(by.name('yToAppend')).sendKeys('5');
		expect(element(by.name('xToAppend')).getAttribute('value')).toEqual('3');
		expect(element(by.name('yToAppend')).getAttribute('value')).toEqual('5');
		element(by.name('addPoint')).click();
		
		element(by.name('xToAppend')).sendKeys('4');
		element(by.name('yToAppend')).sendKeys('4');
		expect(element(by.name('xToAppend')).getAttribute('value')).toEqual('4');
		expect(element(by.name('yToAppend')).getAttribute('value')).toEqual('4');
		element(by.name('addPoint')).click();
		
		element(by.name('signUpSubmit')).click();
	});
	
	it('Show different panes', function(){
		element(by.repeater('item in menu.items').row(1)).click();
		browser.sleep(250);
		element.all(by.repeater('subitem in item.items').row(10)).click();
		element(by.name('proj_title')).click();
		browser.sleep(400);
		element(by.repeater('item in menu.items').row(1)).click();
		element.all(by.repeater('subitem in item.items').row(8)).click();
		element(by.name('proj_title')).click();
		browser.sleep(250);
	});
	
	it('Create a quiz', function(){
		element(by.repeater('item in menu.items').row(3)).click();
		element.all(by.repeater('subitem in item.items').row(18)).click();
		element(by.name('header')).sendKeys('Quiz 1');
		expect(element(by.name('header')).getAttribute('value')).toEqual('Quiz 1');
		element(by.name('intro')).sendKeys('This quiz is all about colors.');
		expect(element(by.name('intro')).getAttribute('value')).toEqual('This quiz is all about colors.');
		element(by.name('submitButton')).click();
	});
	
	it('Add a true/false question', function(){
		element(by.repeater('item in menu.items').row(4)).click();
		element.all(by.repeater('subitem in item.items').row(28)).click();
		element(by.name('explanation')).sendKeys('Orange is the name of a color and a fruit.');
		expect(element(by.name('explanation')).getAttribute('value')).toEqual('Orange is the name of a color and a fruit.');
		element(by.name('query')).sendKeys('Select either true or false.');
		expect(element(by.name('query')).getAttribute('value')).toEqual('Select either true or false.');
		element(by.id('r3')).click();
		
		element(by.id('tfFeedback1')).sendKeys('This is correct because orange is the color of the most delicious fruit ever, which has the same name.');
		expect(element(by.id('tfFeedback1')).getAttribute('value')).toEqual('This is correct because orange is the color of the most delicious fruit ever, which has the same name.');
		
		element(by.id('tfFeedback2')).sendKeys('Ummm....learn your fruits.');
		expect(element(by.id('tfFeedback2')).getAttribute('value')).toEqual('Ummm....learn your fruits.');
		
		element(by.name('saveButtonTF')).click();
		browser.sleep(400);
	});
	
	it('Add a multiple choice question', function(){
		element(by.repeater('item in menu.items').row(4)).click();
		element.all(by.repeater('subitem in item.items').row(28)).click();
		element(by.name('explanation')).sendKeys('What color do you get from mixing blue and yellow?');
		expect(element(by.name('explanation')).getAttribute('value')).toEqual('What color do you get from mixing blue and yellow?');
		element(by.name('query')).sendKeys('Select one of the following answers.');
		expect(element(by.name('query')).getAttribute('value')).toEqual('Select one of the following answers.');
		element(by.id('r1')).click();
		element(by.id('mcN4')).click();
		
		element(by.id('mcAnswer1')).sendKeys('Purple');
		expect(element(by.id('mcAnswer1')).getAttribute('value')).toEqual('Purple');
		element(by.id('mcFeedback1')).sendKeys('Blue and red make purple.');
		expect(element(by.id('mcFeedback1')).getAttribute('value')).toEqual('Blue and red make purple.');
		
		element(by.id('mcAnswer2')).sendKeys('Jack-o-Lantern Orange');
		expect(element(by.id('mcAnswer2')).getAttribute('value')).toEqual('Jack-o-Lantern Orange');
		element(by.id('mcFeedback2')).sendKeys('Red and yellow make orange.');
		expect(element(by.id('mcFeedback2')).getAttribute('value')).toEqual('Red and yellow make orange.');
		
		element(by.id('mcAnswer3')).sendKeys('Green');
		expect(element(by.id('mcAnswer3')).getAttribute('value')).toEqual('Green');
		element(by.id('mcFeedback3')).sendKeys('Blue and yellow make green.');
		expect(element(by.id('mcFeedback3')).getAttribute('value')).toEqual('Blue and yellow make green.');
		element(by.id('mc3')).click();
		
		element(by.id('mcAnswer4')).sendKeys('Fuzzy Wuzzy');
		expect(element(by.id('mcAnswer4')).getAttribute('value')).toEqual('Fuzzy Wuzzy');
		element(by.id('mcFeedback4')).sendKeys('Wait...wut?');
		expect(element(by.id('mcFeedback4')).getAttribute('value')).toEqual('Wait...wut?');
		
		browser.sleep(400);
		browser.executeScript('window.scrollTo(0,130);').then(function () {
			element(by.id('saveButtonMC')).click();
		})
		browser.sleep(500);
	});
	
	it('Add a multiple selection question', function(){
		element(by.repeater('item in menu.items').row(4)).click();
		element.all(by.repeater('subitem in item.items').row(28)).click();
		element(by.name('explanation')).sendKeys('Which of these are primary colors?');
		expect(element(by.name('explanation')).getAttribute('value')).toEqual('Which of these are primary colors?');
		element(by.name('query')).sendKeys('Select one or more of the following answers.');
		expect(element(by.name('query')).getAttribute('value')).toEqual('Select one or more of the following answers.');
		element(by.id('r2')).click();
		element(by.id('msN5')).click();
		
		element(by.id('msAnswer1')).sendKeys('Razzmatazz');
		expect(element(by.id('msAnswer1')).getAttribute('value')).toEqual('Razzmatazz');
		element(by.id('msFeedback1')).sendKeys('Not a chance.');
		expect(element(by.id('msFeedback1')).getAttribute('value')).toEqual('Not a chance.');
		
		element(by.id('msAnswer2')).sendKeys('Red');
		expect(element(by.id('msAnswer2')).getAttribute('value')).toEqual('Red');
		element(by.id('msFeedback2')).sendKeys('Definitely correct.');
		expect(element(by.id('msFeedback2')).getAttribute('value')).toEqual('Definitely correct.');
		element(by.id('ms2')).click();
		
		element(by.id('msAnswer3')).sendKeys('Yellow');
		expect(element(by.id('msAnswer3')).getAttribute('value')).toEqual('Yellow');
		element(by.id('msFeedback3')).sendKeys('This answer is golden.');
		expect(element(by.id('msFeedback3')).getAttribute('value')).toEqual('This answer is golden.');
		element(by.id('ms3')).click();
		
		element(by.id('msAnswer4')).sendKeys('Tumbleweed');
		expect(element(by.id('msAnswer4')).getAttribute('value')).toEqual('Tumbleweed');
		element(by.id('msFeedback4')).sendKeys('...really?');
		expect(element(by.id('msFeedback4')).getAttribute('value')).toEqual('...really?');
		
		element(by.id('msAnswer5')).sendKeys('Blue');
		expect(element(by.id('msAnswer5')).getAttribute('value')).toEqual('Blue');
		element(by.id('msFeedback5')).sendKeys('Right as rain.');
		expect(element(by.id('msFeedback5')).getAttribute('value')).toEqual('Right as rain.');
		element(by.id('ms5')).click();
		
		browser.sleep(400);
		browser.executeScript('window.scrollTo(0,130);').then(function () {
			element(by.id('saveButtonMS')).click();
		})
		browser.sleep(500);
	});
	
	it('Set view and edit to private but allow Darth Vader to view', function(){
		element(by.name('proj_title')).click();
		element(by.name('proj_title')).click();
		element(by.name('permissionButton')).click();
		element(by.name('viewPermissionsButton')).click();
		element(by.name('changeViewPrivate')).click();
		element(by.name('viewPermissionsButton2')).click();
		element(by.name('addContributorsView')).click();
		element(by.name('emailAddress')).sendKeys('Vader99@Empire.net');
		element(by.name('addEmailButton')).click();
		element(by.name('confirmSubmitButton')).click();
		element(by.name('viewPermissionsButton2')).click();
		element(by.name('viewContributorsView')).click();
		browser.sleep(250);
		element(by.name('confirmOKButton')).click();
		browser.sleep(400);
		element(by.name('editPermissionsButton')).click();
		element(by.name('changeEditPrivate')).click();
	});
	
	it('Sign Out', function(){
		element(by.name('userDropDown')).click();
		element(by.name('signOutButton')).click();
		browser.sleep(700);
	});
	
	it('Sign In', function(){
		element(by.name('signInButton')).click();
		element(by.name('username')).sendKeys('DVader');
		element(by.name('password')).sendKeys('password');
		
		expect(element(by.name('username')).getAttribute('value')).toEqual('DVader');
		expect(element(by.name('password')).getAttribute('value')).toEqual('password');
		
		element(by.name('signIn')).click();
		element(by.name('proj_title')).click();
		browser.sleep(700);
	});
	
	it('Sign Out', function(){
		element(by.name('userDropDown')).click();
		element(by.name('signOutButton')).click();
	});
	
	it('Sign In', function(){
		element(by.name('signInButton')).click();
		element(by.name('username')).sendKeys('DHelmet');
		element(by.name('password')).sendKeys('password');
		
		expect(element(by.name('username')).getAttribute('value')).toEqual('DHelmet');
		expect(element(by.name('password')).getAttribute('value')).toEqual('password');
		
		element(by.name('signIn')).click();
		element(by.name('proj_title')).click();
		browser.sleep(700);
	});
	
	it('Set view to public, allow Darth Vader to edit', function(){
		element(by.name('permissionButton')).click();
		element(by.name('editPermissionsButton2')).click();
		element(by.name('addContributorsEdit')).click();
		element(by.name('emailAddress')).sendKeys('Vader99@Empire.net');
		element(by.name('addEmailButton')).click();
		element(by.name('confirmSubmitButton')).click();
		element(by.name('editPermissionsButton2')).click();
		element(by.name('viewContributorsEdit')).click();
		browser.sleep(250);
		element(by.name('confirmOKButton')).click();
	});
	
	it('Sign Out', function(){
		element(by.name('userDropDown')).click();
		element(by.name('signOutButton')).click();
	});
	
	it('Sign In', function(){
		element(by.name('signInButton')).click();
		element(by.name('username')).sendKeys('DVader');
		element(by.name('password')).sendKeys('password');
		
		expect(element(by.name('username')).getAttribute('value')).toEqual('DVader');
		expect(element(by.name('password')).getAttribute('value')).toEqual('password');
		
		element(by.name('signIn')).click();
		element(by.name('proj_title')).click();
		browser.sleep(1500);
	});
	
});
