"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $window, TeamStorage, ClubFactory) {

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

	let TeamData = [
        {
          "-short_club_name": "Arsenal",
          "SYMID": "ARS",
          "-uID": "t3",
          "-web_address": "http://www.arsenal.com",
          "Name": "Arsenal",
          "Player": [
            {
              "-uID": "p48844",
              "Name": "David Ospina",
              "Position": "Goalkeeper"
            },
            {
              "-uID": "p98980",
              "Name": "Emiliano Martinez",
              "Position": "Goalkeeper"
            }
            ]
        },
        {
          "-short_club_name": "Bournemouth",
          "SYMID": "BOU",
          "-uID": "t91",
          "Founded": "1899",
          "Name": "Bournemouth",
          "Player": [
            {
              "-uID": "p18726",
              "Name": "Artur Boruc",
              "Position": "Goalkeeper"
            },
            {
              "-uID": "p61302",
              "Name": "Ryan Allsop",
              "Position": "Goalkeeper"
            }
            ]
        }
    ];




	// TeamStorage.playerHelper(TeamData);

  ClubFactory.getClubData()
  .then( (data) => {
    console.log("getting data?", data);
  });


});


