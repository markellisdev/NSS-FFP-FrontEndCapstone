"use strict";

var app = angular.module("FFP-APP", ["ngRoute"]);

/*-- Authenticate User --*/
let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
	AuthFactory.isAuthenticated()
	.then ( (userExists) => {
		if(userExists) {
			resolve();
		} else {
			reject();
		}
	});
});

app.config(function($routeProvider) {
	$routeProvider
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'LoginCtrl'
	})
	.when('/test', {
		templateUrl: 'partials/test.html',
		controller: 'AddClubCtrl'
	});
}).config(function($locationProvider){
	$locationProvider.html5Mode(true);
});


app.run( ($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain
	};
	firebase.initializeApp(authConfig);
});

