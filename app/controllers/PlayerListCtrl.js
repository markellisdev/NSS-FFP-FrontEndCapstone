'use strict';

app.controller('PlayerListCtrl', function($scope, TeamStorage, $location, AuthFactory, ClubFactory, MatchFactory, NumFactory, TeamFactory){
    console.log("Is PlayerListCtrl running here? ");
    let currentUser = AuthFactory.getUser();
    let players;
    $scope.players = [];
    $scope.clubs = [];
    $scope.matches = [];
    let p1 = TeamStorage.getPlayerList()
    .then( (playerArray) => {
        players = playerArray;
    });
    let p2 = ClubFactory.getClubs()
    .then( (clubsArray) => {
        $scope.clubs = clubsArray;
        $scope.$apply();
    });
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
    $scope.selectProps = ["Season Points", "5 Week Form", "3 Week Form"];
    // Nothing after this happens until all promises are returned, players, clubs and matches
    Promise.all([p1, p2, p3]).then(() => {
        let uID = "-uID";
        //This adds the proper team data to each player
        for (let x=0; x < players.length; x++) {
            let tempID = players[x].clubID;
            for (let xx=0; xx < $scope.clubs.length; xx++) {
                if ($scope.clubs[xx].uID === tempID) {
                    players[x].code = $scope.clubs[xx].code;
                    players[x].key = $scope.clubs[xx].key;
                    players[x].name = $scope.clubs[xx].name;
                    players[x].primaryColour = $scope.clubs[xx].primaryColour;
                    players[x].secondaryColour = $scope.clubs[xx].secondaryColour;
                }
            }
        }
        // console.log("players", players);
        console.log("matchData", $scope.matches);
        //This iterates through matches to add points per week to players
        for (let n=15; n <= $scope.matches.length; n++) {
            // For each key, which should be a player id
            for (let playerId in $scope.matches[n]) {
                console.log("Which player / match week? ", playerId, n);
                // For each player, compare key to players uID
                for(var nn=0; nn < players.length; nn++) {
                    if (playerId === players[nn][uID]) {
                        players[nn].playerScores = players[nn].playerScores ? players[nn].playerScores : [];
                        // console.log("player matched the score", nn, playerId, $scope.matches[n][playerId]);
                        // console.log("Which player? ", players[nn].Name);
                        players[nn].playerScores.push($scope.matches[n][playerId]);
                        // console.log("Is this the player?", players[nn]);
                    }
                }
                // `prop` contains the name of each property, i.e. `'code'` or `'items'`
                // consequently, `data[prop]` refers to the value of each property, i.e.
                // either `42` or the array
            }
        }
        console.log("loops done, player array", players);
        for (let ap=0; ap < players.length; ap++) {
        	if (players[ap].playerScores) {
	        	$scope.players.push(players[ap]);
	        console.log("These players scored", $scope.players, "and these are the matches", $scope.matches);}
        }



        // $scope.keys(data).forEach(function(prop) {
        //   // `prop` is the property name
        //   // `data[prop]` is the property value
        // });
    });
});
// for (let nn=0; nn < players.length; nn++) {
//  console.log("$scope.matches", $scope.matches[n]);
//  break;
//  if (players[nn].uID == $scope.matches[n]) {
//      console.log("Which player is first?", players[nn]);
//      debugger;
//      players[nn].Gameweeks[n].append($scope.matches[n][players[nn]]);
//  }
// console.log("Which player scored", players[nn]);
// }