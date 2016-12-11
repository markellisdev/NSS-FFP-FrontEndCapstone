"use strict";

var app = angular.module ("FFP-APP", [ng-route]);

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