"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $window) {

	$scope.account = {
		email: "",
		password: ""
	};

	let logout = () => {
		AuthFactory.logoutUser();
	};

	if(AuthFactory.isAuthenticated()){
		logout();
	}

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


});


