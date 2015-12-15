#WXYZ Project
---
####SQUAD

Member  | GitHub Account | Role
------------- | ------------- | -------------
David Campbell  | John12341234 | Dev Team
Matt Fidler  | fidlkm | Dev Team
Madison Hicks  | madleigh12 | Dev Team
Kharl McCatty  | kharlm | Dev Team
Joseph Mullen  | jpmullen6 | Dev Team
Patrick Poplawska  | ppoplawska | Project Manager
Igor Vakulenko  | neonizator | Scrum Master

User stories were logged using Pivotal Tracker and can be found [here](https://www.pivotaltracker.com/n/projects/1430644).

The deployed site can be found at: [http://icw.cise.ufl.edu/](http://icw.cise.ufl.edu/)

---
####GIVING CREDIT WHERE CREDIT IS DUE

All listed software was integrated into the project. Original source code can be at the listed links.

Software  | Link
------------- | -------------
MEAN.js  | [meanjs.org](http://meanjs.org/)
Bootstrap  | [getbootstrap.com](http://getbootstrap.com/)
ckEditor  | [ckeditor.com](http://ckeditor.com/)
Angular Youtube Embedded  | [github.com/brandly/angular-youtube-embed](https://github.com/brandly/angular-youtube-embed)
---
####FEATURES IMPLEMENTED
Feature  | Description | Screenshot
----------------------------------------- | ----------------------------------------- | -----------------------------------------
*Rich Text Editor*  | Powerful editor that allows lots of style in text formatting. |![Feature 1](/Feature ScreenShots/Feature1.PNG)
*UI Improvement*  | Added menu highlighting for easy user navigation | ![Feature 2](/Feature ScreenShots/Feature2.PNG)
*Collapsable multi-media*  | Toggles the display for media elements | ![Feature 3](/Feature ScreenShots/Feature3.PNG)
*Cross site linking element*  | Allows the user to view a different project or a specific element | ![Feature 4](/Feature ScreenShots/Feature4.PNG)
*Anchoring to project elements* | Allows you to scroll to a particular element in a project | ![Feature 51](/Feature ScreenShots/Feature5.PNG)
*Equation Elements* | Allows for mathematical equations to be inserted to projects | ![Feature 6](/Feature ScreenShots/Feature6.PNG)
*Table Element* | Inserted table into projects | ![Feature 7](/Feature ScreenShots/Feature7.PNG)
*Preview* | Displays the website using CSS of the parent site | ![Feature 8](/Feature ScreenShots/Feature8.PNG)
*User Documentation* | Detailed instructions for features in the website | ![Feature 9](/Feature ScreenShots/Feature9.PNG)

---
####HOW TO RUN THE PROJECT LOCALLY
1. Make sure you have MeanJS installed and functioning.
2. Download project zip file from the github repository and unzip
3. In command line, navigate to the project file and run ``npm install``
4. In a separate command line run ``mongod``
5. Run ``grunt``
6. Open up a web browser and navigate to ``localhost:3000``

---
####UPDATE DATABASE AND SERVER CONNECTIONS
This project does not require a database with persistent data. For development we used local databases on each developer's computer to avoid having database errors that could hinder other developers' work. Simply running mongod should start an empty database which can then be populated with users and projects from the website.
