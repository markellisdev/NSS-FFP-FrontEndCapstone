'use strict';

app.controller('PlayerListCtrl', function($scope, TeamStorage, $location, AuthFactory, ClubFactory, MatchFactory, NumFactory){

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

		let md = 3;

		let mdWord = NumFactory.toWords(md);
		console.log("mdWord", md, mdWord);


		let Gameweek =
			{1: 5, 2: 2, three: 10};

		console.log("Gameweek", Gameweek.three);
		debugger;



		// This is to loop through all MatchData in Firebase
		for (let n=0; n < $scope.matches.length; n++) {
			// console.log("matches.length working??", $scope.matches[n].MatchInfo.MatchDay);

			// If the MatchDay == user's selection
			if ($scope.matches[n].MatchInfo.MatchDay == 1) {
				let arr = $scope.matches[n].MatchInfo.MatchDay;
				console.log("array of Matches for week 1", arr);

				let TeamData = $scope.matches[n].TeamData;

				// For each match, count goals
				for (let nn=0; nn < TeamData.length; nn++) {
					//If there are goals
					if (TeamData[nn].Goal) {
						let GoalData = TeamData[nn].Goal;
						// For each goal get PlayerRef
						for (let nnn=0; nnn < GoalData.length; nnn++) {
							let goalScorer = GoalData[nnn].PlayerRef;
							// Loop through players
							for(let p=0; p < $scope.players.length; p++) {
								let uID = "-uID";
								// When goalScorer == the players uID, add points accordingly
								if (goalScorer == $scope.players[p][uID]) {
									// Ternary to evaluate if there are already weekPoints. If there are, add to them
									$scope.players[p].weekPoints = $scope.players[p].weekPoints ? $scope.players[p].weekPoints : 0;
									$scope.players[p].weekPoints += 5;
									$scope.$apply();
									console.log("The goal scorer is players", p, $scope.players[p] );
									debugger;
								}
							}
							// $scope.players[]
						}
					}

				}
			}
		}

		for (let n=0; n < $scope.matches.length; n++) {
			// Evaluate only matches that reached FullTime (those completed)
			if($scope.matches[n].MatchInfo.Period == "FullTime") {

				let md = $scope.matches[n].MatchInfo.MatchDay;

				for (let nn=0; nn < TeamData.length; nn++) {
					//If there are goals
					if (TeamData[nn].Goal) {
						let GoalData = TeamData[nn].Goal;
						// For each goal get PlayerRef
						for (let nnn=0; nnn < GoalData.length; nnn++) {
							let goalScorer = GoalData[nnn].PlayerRef;
							// Loop through players
							for(let p=0; p < $scope.players.length; p++) {
								let uID = "-uID";
								// When goalScorer == the players uID, add points accordingly
								if (goalScorer == $scope.players[p][uID]) {
									// Ternary to evaluate if there are already weekPoints. If there are, add to them
									$scope.players[p].weekPoints = $scope.players[p].weekPoints ? $scope.players[p].weekPoints : 0;
									$scope.players[p].weekPoints += 5;
									$scope.$apply();
									console.log("The goal scorer is players", p, $scope.players[p] );
									debugger;
								}
							}
							// $scope.players[]
						}
					}

				}

			}
		}

	});








});