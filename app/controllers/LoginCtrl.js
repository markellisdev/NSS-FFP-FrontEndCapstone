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

	// Testing getPlayerList
	// TeamStorage.getPlayerList();

	/* Testing postNewPlayer function ----------
	let newPlayer = {
      "-uID": "p37265",
      "Name": "Alexis Sánchez",
      "Position": "Forward"
    };

	TeamStorage.postNewPlayer(newPlayer);
	*/

	/* Testing getSinglePlayer function ----------

	TeamStorage.getSinglePlayer("-KZ2N0WSCk7W6bhdudGV")
	.then ((data) => {
		console.log(data);
	});
	*/


});


