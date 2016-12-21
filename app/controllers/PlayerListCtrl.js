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
		$scope.matches = matchArray[0].MatchData;
		$scope.$apply();
	});

	Promise.all([p1, p2, p3]).then(() => {
		// console.log("Did promise dot all work? ", $scope.matches);
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
		}

		for (let n=0; n < $scope.matches.length; n++) {
			// console.log("matches.length working??", $scope.matches[n].MatchInfo.MatchDay);

			if ($scope.matches[n].MatchInfo.MatchDay == 1) {
				let arr = $scope.matches[n].MatchInfo.MatchDay;
				console.log("array of Matches for week 1", arr);

				let TeamData = $scope.matches[n].TeamData;

				for (let nn=0; nn < TeamData.length; nn++) {
					if (TeamData[nn].Goal) {
						let GoalData = TeamData[nn].Goal;
						for (let nnn=0; nnn < GoalData.length; nnn++) {
							console.log("Any goals?", GoalData[nnn].PlayerRef);
							// $scope.players[]
						}
					}

				}
			}
		}

	});








});