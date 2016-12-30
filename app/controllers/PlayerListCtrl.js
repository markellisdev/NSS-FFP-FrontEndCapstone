'use strict';

app.controller('PlayerListCtrl', function($scope, TeamStorage, $location, AuthFactory, ClubFactory, MatchFactory, NumFactory, TeamFactory){

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

	//This is for sorting data on the teamView partial
	$scope.sortType     = 'Name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.selectProps = ["Season Points", "5 Week Form", "3 Week Form"];


	// Nothing after this happens until all promises are returned, players, clubs and matches
	Promise.all([p1, p2, p3]).then(() => {
		console.log("Did promise dot all work? ", $scope.matches);
		let Gameweek = [];

		for (let n=0; n < $scope.matches.length; n++) {
		// 	// Evaluate only matches that reached FullTime (those completed)
			if($scope.matches[n].MatchInfo.Period == "FullTime") {

				let md = $scope.matches[n].MatchInfo.MatchDay;
		// This  changes the gameweek number to a word, 3=three
				let mdWord = NumFactory.toWords(md);
				console.log("mdWord", md, mdWord);
		// Create and array of Gameweeks to be populated by score data later
				Gameweek[mdWord] = 0;
			}
		}

		for (let x=0; x < $scope.players.length; x++) {
			let tempID = $scope.players[x].clubID;

			for (let xx=0; xx < $scope.clubs.length; xx++) {
				if ($scope.clubs[xx].uID === tempID) {
					$scope.players[x].code = $scope.clubs[xx].code;
					$scope.players[x].key = $scope.clubs[xx].key;
					$scope.players[x].name = $scope.clubs[xx].name;
					$scope.players[x].primaryColour = $scope.clubs[xx].primaryColour;
					$scope.players[x].secondaryColour = $scope.clubs[xx].secondaryColour;
					$scope.players[x].Gameweeks = Gameweek;
					$scope.$apply();
				}
			}
		}




		// This is to loop through all MatchData in Firebase
		for (let n=0; n < $scope.matches.length; n++) {
			// console.log("matches.length working??", $scope.matches[n].MatchInfo.MatchDay);
		let weekNum = $scope.matches[n].MatchInfo.MatchDay;
		let weekWord = NumFactory.toWords(weekNum);
			// If the MatchDay == user's selection
			// -----------------------
/*-- There's still a problem with the logic here and points totals --*/
/*-- --------------------------------------------------------------------------------------- --*/
			if ($scope.matches[n].MatchInfo.MatchDay == weekNum) {
				let arr = $scope.matches[n].MatchInfo.MatchDay;
				console.log("array of Matches for week ", arr);

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
									// $scope.players[p].weekPoints = $scope.players[p].weekPoints ? $scope.players[p].weekPoints : 0;
									$scope.players[p].Gameweeks[weekWord] = $scope.players[p].Gameweeks[weekWord] ? $scope.players[p].Gameweeks[weekWord] : 0;
									$scope.players[p].Gameweeks[weekWord] += 5;
									// $scope.players[p].weekPoints += 5;
									$scope.$apply();
									console.log("The goal scorer is players", p, $scope.players[p] );
									// debugger;
								}
							}
							// $scope.players[]
						}
					}

				}
			}
		}

		// for (let n=0; n < $scope.matches.length; n++) {
		// 	// Evaluate only matches that reached FullTime (those completed)
		// 	if($scope.matches[n].MatchInfo.Period == "FullTime") {

		// 		let md = $scope.matches[n].MatchInfo.MatchDay;
		// This  changes the gameweek number to a word, 3=three
		// 		let mdWord = NumFactory.toWords(md);
		// 		console.log("mdWord", md, mdWord);
		// Create and array of Gameweeks to be populated by score data later
		// 		let Gameweek = [];
		//		this.addGameweek = (mdWord) => {
		//			if (mdWord) {
		//				this.gweek = {
		//					[mdWord] = 0
		//				};
		//			})
		//		});
		//
		//
		//

		// 		for (let nn=0; nn < TeamData.length; nn++) {
		// 			//If there are goals
		// 			if (TeamData[nn].Goal) {
		// 				let GoalData = TeamData[nn].Goal;
		// 				// For each goal get PlayerRef
		// 				for (let nnn=0; nnn < GoalData.length; nnn++) {
		// 					let goalScorer = GoalData[nnn].PlayerRef;
		// 					// Loop through players
		// 					for(let p=0; p < $scope.players.length; p++) {
		// 						let uID = "-uID";
		// 						// When goalScorer == the players uID, add points accordingly
		// 						if (goalScorer == $scope.players[p][uID]) {
		// 							// Ternary to evaluate if there are already weekPoints. If there are, add to them
		// 							$scope.players[p].weekPoints = $scope.players[p].weekPoints ? $scope.players[p].weekPoints : 0;
		// 							$scope.players[p].weekPoints += 5;
		// 							$scope.$apply();
		// 							console.log("The goal scorer is players", p, $scope.players[p] );
		// 							debugger;
		// 						}
		// 					}
		// 					// $scope.players[]
		// 				}
		// 			}

		// 		}

		// 	}
		// }

	});








});