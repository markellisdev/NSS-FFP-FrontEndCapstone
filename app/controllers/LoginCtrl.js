"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $window) {

	$scope.account = {
		email: "",
		password: ""
	};

	$scope.register = () => {
		AuthFactory.createUser($scope.account)
		.then( (userData) => {
			$scope.login();
		});
	};

	$scope.login = () => {
		AuthFactory.loginUser($scope.account)
		.then( (user) => {
			$window.location.href ="#";
		});
	};

	$scope.logout = () => {
		AuthFactory.logoutUser();
		// .then( (user) => {
		// 	$window.location.href ="#";
		// });
	};
});
