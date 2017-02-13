"use strict";

app.controller("LoginCtrl", ['$scope', "$rootScope", "AuthFactory", '$window', 'TeamStorage', 'TeamFactory', 'LoginCtrlService',
	function($scope, $rootScope, AuthFactory, $window, TeamStorage, TeamFactory, LoginCtrlService) {

	$scope.teamID = null;

	$scope.account = {
		email: "b@b.com",
		password: "password1234"
	};

	let logout = () => {
		AuthFactory.logoutUser()
		.then(function(data) {
			$window.location.href = "/login";
			$scope.$apply();
		});
	};

	// if(AuthFactory.isAuthenticated()){
	// 	logout();
	// }

	$scope.register = () => {
		AuthFactory.createUser($scope.account)
		.then( (userData) => {
			LoginCtrlService.account.uid = userData.uid;
			LoginCtrlService.account.email = userData.email;
			$scope.login();
		})
		.then( () => {
			$scope.newFantasyTeam = {
				'uid': LoginCtrlService.account.uid,
				'title': '',
				'description': '',
				'teamID': ''
			};
			return TeamFactory.postNewTeam($scope.newFantasyTeam);
		})
		.then( (obj) => {
			LoginCtrlService.teamID = obj.name;
		});
	};

	$scope.login = () => {
		LoginCtrlService.login($scope.account, function(){
			$scope.account=LoginCtrlService.account;
			TeamFactory.getUserTeams(LoginCtrlService.account.uid)
					.then (function(result) {
						LoginCtrlService.teamID = result[0].teamID;
						LoginCtrlService.title = result[0].title;
						LoginCtrlService.description = result[0].description;
						$rootScope.$broadcast("teamNameUpdated");
					})
			.then (function() {
				TeamFactory.getTeamPlayers(LoginCtrlService.teamID)
					.then (function(players) {
						LoginCtrlService.Players = players;
						$rootScope.$broadcast("playersUpdated");
					});
			});
			$window.location.href ="#/team";
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


	// TeamStorage.playerHelper(TeamData);


}]);


