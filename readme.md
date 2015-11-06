
Staring server:-goto e:/ottlodevelopment/ottloviewrs-screens grunt dev-debug -–force
starting mongodb :- c:/programmefiles/mongodb/server/3.0/bin mongod --dbpath E:\mongodb\test

5.1 Structure of Project

Whole project is written using Angular.js at front end side and node.js at back end side. Grunt is used to generate distribution file. Bower is for managing UI component.

The first file compiled and run by node,js server is server.js file. From here only it is possible to decide our template index page, routes , server port , database config file location and total modules.

Config folder 
This folder is for setting username and password for database ,aws at development,producrion. 
We have to add here all models which are used.





Packages folder 
This the main folder where we write our modules code. In package there is folfer for each and every module and having structure explained below.

Modules folder



As shown in the figure each module logic is divided in two parts public part and server part. Public folder contains the code of front end and server folder contains the code of back end. 
App.js file creates the angular module and bind this all angular code together and also specify dependencies between modules.


Public folder


Public folder contains the folder called assets, controllers, resources, routes, services, tests, views. Purpose of folder is corresponds to its name. 
Flow of calling is like first request goes to routes in which list of route is defined. On find of specific route defined view is rendered with its controller. 
Purpose of controller is to maintain the javascript of the page. 
Controller may require the services which are reused on different pages or can’t be exposed to user. 
Service layer can use the resource layer for calling back end API.

Server folder

Server folder contains routes, controller and models. Routes specify the restful API’s path which is available to user. Controller contains the back end logic and models specify the way we want to fetch data from database.

5.2.1 Ottlo console APIs 
? List of Useful Functions 

* 
ToggleSelection:- Used for adding selected items in an array and remove item from array while deselect checkbox. 
Location:- sellSlotController 
Create :- create the object which is ready to be entered in database. 
Location:- sellSlotService 
* 
uploadFileToBucket :- upload file to AWS bucket specified 
Location:- file-upload service 
uploadFileToREST :- allow to upload file on local server. 
Location:- file-upload service 
$scope.selectedAdsslotWise:- show slotwse selected ads 
? List of Useful backend services 

/api/ads/getAllAd :- get all ads 30 

/api/ads/createAd :- create ad 
/api/ads/excelUtility :- Excel file reader. 
/api/Buyer/getAllSellSlots 
/api/Buyer/getMyAd 
/api/Buyer/selectedSellslots 
/api/Buyer/selectedAds 
/api/seller/sellSlot 


5.2.2 Ottlo Viewers’ APIs 
? List of Useful Functions 

FBInit(appId):-intialize facebook. 
checkLoginState:-check login status 
testFBAPI:-test fb login 
testAWSDeveloperIdentityAPI:- authenticate user with developer identity and get token to access dataset. 
Synchronize:-sync the data 
testAWSCognitoAPI: Where authenticated via Facebook 
? List of Useful backend services 

/login post :- authenticate with passport to store user data in session 
passport.use('local-login'); 
Location:-config/passport-config.js 
? List of Useful directives 

appIcon :- 
<app-icon src="{{allads[i].ad_url}}"></app-icon> 
bookIcon:- 
<book-icon src="http://ebookfriendly.com/wp-content/uploads/2014/10/Fiction-allows-us-to-experience-anything-540x752.jpg"></book-icon> 31 

fileModel:- 
file-model="myFile" 
memoryIcon,, playIcon, videoIcon, watchIcon also created


Creating new module in Package:-

add file in gruntfile.js
all upto end
add route in server.js file
add app.min.js in index.ejs in shared
add mudule in main app.js

Creating new model:-
create new model in package/moduleserver/model js file
add in db.config file
load in waterline


passport guide:-
passport-config.js and route-config.js file
login stretagy local login and fblogin link and logic available on official

creting directives:-
inshared create directive .js and set partial and parameters


creting front end route :-
add it in routes file
specify view and controller.
service can be reused

AWS services are :
for uploading file using aws and rest is created in module ads and access
AWS sync ,authenticate using IAM user has been created in ads services module 
amazon cognito sync service(sync data on aws and device.)


routes to use AWS services:-
in access server there are different routes to interact with AWS
/api/access/getDeveloperIdentityToken

in screenshots policies photo is there


mongo demo:-
access management route contains some demo to connect with momngo