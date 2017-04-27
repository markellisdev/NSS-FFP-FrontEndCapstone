'use strict';

app.controller('PlayerListCtrl', ['$scope', '$rootScope', 'TeamStorage', '$location', 'AuthFactory', 'ClubFactory', 'MatchFactory', 'NumFactory', 'TeamFactory', 'FantasyPlayerFactory', 'LoginCtrlService',
    function($scope, $rootScope, TeamStorage, $location, AuthFactory, ClubFactory, MatchFactory, NumFactory, TeamFactory, FantasyPlayerFactory, LoginCtrlService)
    {
    console.log("Is PlayerListCtrl running here? ");

    let currentUser = AuthFactory.getUser();
    let donkeys; //Was originally players, but caused confusion with $scope.players
    $scope.players = [];
    $scope.clubs = [];
    $scope.matches = [];
    let p1 = TeamStorage.getPlayerList()
    .then( (playerArray) => {
        donkeys = playerArray;
    });
    let p2 = ClubFactory.getClubs()
    .then( (clubsArray) => {
        $scope.clubs = clubsArray;
        $scope.$apply();
    });
// Sort function for table
	$scope.mySortFunction = function(item) {
		// debugger;
		switch ($scope.sortType) {
			case "playerScores":
				return parseInt(item.playerScores[0]);
			default: return item[$scope.sortType];
		}
	};

	$scope.addToFantasyTeam = function(selectedPlayer) {
        selectedPlayer.teamID = LoginCtrlService.teamID;
		console.log("Did this capture this individual player's id? ", selectedPlayer);
		FantasyPlayerFactory.postNewPlayer(selectedPlayer)
        .then ((playerObj)=> {
            LoginCtrlService.Players.push(playerObj);
            $rootScope.$broadcast("playersUpdated");
            //remove player from list
            console.log("is this trying to remove the right player? ", selectedPlayer ); //This is getting correct player- below function not correct though
            if ( ~selectedPlayer ) $scope.players.splice(selectedPlayer, 1); //this doesn't seem to work
        });
	};
// Function to return completed matches, i.e. only matches that reached FullTime
    function isFullTime(match) {
      return match.MatchInfo.Period === 'FullTime';
    }
// Function to group matches in Match Weeks (referred to here as MatchDay i.e. week 1, 2, 3, etc)
    function groupByMatchDay(total, current) {
        // console.log("groupByMatchDay function inside", total[current.MatchInfo.MatchDay]);
      if (total[current.MatchInfo.MatchDay]) {
        total[current.MatchInfo.MatchDay].push(current.TeamData);
      } else {
        total[current.MatchInfo.MatchDay] = [current.TeamData];
      }
      return total;
    }
// Return matches where goals were scored
    function hasGoals(match) {
      return match.Goal;
    }
// Function to get goals from each match
    function getMatchGoals(match){
      return match
        .filter(hasGoals)
        .map(match => match.Goal)
        .reduce((total, current) => {
          return total.concat(current.map(c => c.PlayerRef));
        }, []);
    }
// Function to calculate players score
    function calculatePlayerScore(total, player) {
        if (total.hasOwnProperty(player)) {
          total[player] += 5;
        } else {
          total[player] = 5;
        }
        return total;
      }
// Function to flatten an array
    function flatten(arr) {
      return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
      }, []);
    }
//This will get matches that reached fulltime and group by matchday
    let p3 = MatchFactory.getMatches() //Need to write this function
    .then( (matchData) => {
        return matchData
            .filter(isFullTime)
            .reduce(groupByMatchDay, [])
            .map(x => flatten(x.map(getMatchGoals)).reduce(calculatePlayerScore, {}));
    })
    .then(matchData => {
        // console.log("matchData after reducing by matchday", matchData);
        $scope.matches = matchData;
        $scope.$apply();
    });
    //This is for sorting data on the teamView partial
    $scope.sortType     = 'Name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    // Nothing after this happens until all promises are returned, players, clubs and matches
    Promise.all([p1, p2, p3]).then(() => {
        let uID = "-uID";
        //This adds the proper team data to each player
        for (let x=0; x < donkeys.length; x++) {
            let tempID = donkeys[x].clubID;
            for (let xx=0; xx < $scope.clubs.length; xx++) {
                if ($scope.clubs[xx].uID === tempID) {
                    donkeys[x].code = $scope.clubs[xx].code;
                    donkeys[x].key = $scope.clubs[xx].key;
                    donkeys[x].name = $scope.clubs[xx].name;
                    donkeys[x].primaryColour = $scope.clubs[xx].primaryColour;
                    donkeys[x].secondaryColour = $scope.clubs[xx].secondaryColour;
                }
            }
        }

        //This iterates through matches to add points per week to players
        for (let n=15; n <= $scope.matches.length; n++) {
            // For each key, which should be a player id
            for (let playerId in $scope.matches[n]) {
                // console.log("Which player / match week? ", playerId, n);
                // For each player, compare key to players uID
                for(var nn=0; nn < donkeys.length; nn++) {
                    if (playerId === donkeys[nn][uID]) {
                        donkeys[nn].playerScores = donkeys[nn].playerScores ? donkeys[nn].playerScores : [];
                        // console.log("player matched the score", nn, playerId, $scope.matches[n][playerId]);
                        // console.log("Which player? ", donkeys[nn].Name);
                        donkeys[nn].playerScores.push($scope.matches[n][playerId]);
                        // console.log("Is this the player?", donkeys[nn]);
                    }
                }
            }
        }
        for (let z=0; z < donkeys.length; z++) {
            if (donkeys[z].playerScores) {
                $scope.players.push(donkeys[z]);
                $scope.$apply();
            }
        }
        // console.log("loops done, player array", $scope.players);
        // console.log("Is this item a number?", Number.isNaN($scope.players[0]));
    });
}]);
