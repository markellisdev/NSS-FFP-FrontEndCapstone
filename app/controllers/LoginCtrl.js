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
		console.log("scope account", $scope.account)
		AuthFactory.loginUser($scope.account)
		.then( (user) => {
			$window.location.href ="#";
		});
	};
});