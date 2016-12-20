'use strict';

app.controller('PlayerListCtrl', function($scope, TeamStorage, $location, AuthFactory, ClubFactory, MatchFactory){

	console.log("Is PlayerListCtrl running here? ");

	let currentUser = AuthFactory.getUser();

	$scope.players = [];
	$scope.clubs = [];
	$scope.matches = [];

	let p1 = TeamStorage.getPlayerList()
	.then( (playerArray) => {
		$scope.players = playerArray;
		$scope.$apply();
	});

	let p2 = ClubFactory.getClubs()
	.then( (clubsArray) => {
		$scope.clubs = clubsArray;
		$scope.$apply();
	});

	let p3 = MatchFactory.getMatches() //Need to write this function
	.then( (matchArray) => {
		$scope.matches = matchArray.SoccerDocument.MatchData;
		$scope.$apply();
	});

	Promise.all([p1, p2, p3]).then(() => {
		console.log("Did promises all work? ", $scope.players);
		for (let x=0; x < $scope.players.length; x++) {
			let tempID = $scope.players[x].clubID;

			for (let xx=0; xx < $scope.clubs.length; xx++) {
				if ($scope.clubs[xx].uID === tempID) {
					$scope.players[x].code = $scope.clubs[xx].code;
					$scope.players[x].key = $scope.clubs[xx].key;
					$scope.players[x].name = $scope.clubs[xx].name;
					$scope.players[x].primaryColour = $scope.clubs[xx].primaryColour;
					$scope.players[x].secondaryColour = $scope.clubs[xx].secondaryColour;
					$scope.$apply();
				}
			}
			// console.log("Player with stats added ", $scope.players[0]);
		}
	});






	// 	for (let n=0; n < $scope.matches.length; n++) {
	// 		let TeamData = $scope.matches.TeamData;
	// 		let GoalData = TeamData[nn].Goal;
	// 		for (let nn=0; nn < TeamData.length; nn++) {

	// 			for (let nnn=0; nnn < GoalData.length; nnn++) {
	// 				$scope.players
	// 			}
	// 		}
	// 	}
	// }

});