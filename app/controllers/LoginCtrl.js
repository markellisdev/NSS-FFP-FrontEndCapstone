"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $window, TeamStorage) {

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

	// TeamStorage.getPlayerList();
	let newPlayer = {
      "-uID": "p37265",
      "Name": "Alexis Sánchez",
      "Position": "Forward"
    };

	TeamStorage.postNewPlayer(newPlayer);

});


