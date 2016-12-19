"use Strict";

app.controller('AddClubCtrl', function($scope, ClubFactory, $location, AuthFactory, TeamStorage) {

	let currentUser = AuthFactory.getUser();

	$scope.clubDataReturned = [];

	let clubData = ClubFactory.getClubData()
	.then( (data) => {
		// console.log("getting club data?", data);
		$scope.clubDataReturned = data.SoccerFeed.SoccerDocument.Team; //data.guides to return array inside object
		$scope.$apply();
		});		

	$scope.clubs = [];

	$scope.playerHelper = () => {
		console.log("This is the club data inside ClubCtrl", $scope.clubDataReturned);
		for(var x=0; x<$scope.clubDataReturned.length; x++) {
			let players = $scope.clubDataReturned[x].Player;
			for(var xx=0; xx<players.length; xx++) {
				let tempName = "-uID"; //The dash(-) beginning -uID wasn't working. Solution was to create this tempName variable, which requires bracket notation in the next line.

				players[xx].clubID = $scope.clubDataReturned[x][tempName];
				console.log("This is players xx ", players[xx].clubID);

				TeamStorage.postNewPlayer(players[xx]);
			}
		}
	};

});