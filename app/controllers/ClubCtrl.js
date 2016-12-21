"use Strict";

// NOT ACTIVE - This controller was only used to upload data from json files to Firebase to form my API, since I did not have one. It is not active in the app without changes to test.html, ClubFactory, and also PlayerFactory. It was only used with the click function inside the test.html partial.

app.controller('AddClubCtrl', function($scope, ClubFactory, $location, AuthFactory, TeamStorage) {

	let currentUser = AuthFactory.getUser();

	$scope.clubDataReturned = [];

	let clubData = ClubFactory.getClubData()
	.then( (data) => {
		$scope.clubDataReturned = data.SoccerFeed.SoccerDocument.Team; //data.SoccerFeed.SoccerDocument to return array inside object
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
				// console.log("This is players xx ", players[xx].clubID);
				TeamStorage.postNewPlayer(players[xx]);
			}
		}
	};

	$scope.clubList = ClubFactory.getClubList()
	.then( (data) => {
		$scope.clubListReturned = data.clubs;
		$scope.$apply();
	});

	$scope.clubHelper = () => {
		console.log("This is the club list inside ClubCtrl", $scope.clubListReturned);
		for(var x=0; x<$scope.clubListReturned.length; x++) {
			let club = $scope.clubListReturned;
				console.log("This is club x ", club[x]);
				// TeamStorage.postNewPlayer(club[x]);
			}
	};

});