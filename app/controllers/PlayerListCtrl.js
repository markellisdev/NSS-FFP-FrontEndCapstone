'use strict';

app.controller('PlayerListCtrl', function($scope, TeamStorage, $location, AuthFactory){

	let currentUser = AuthFactory.getUser();

	TeamStorage.getPlayerList()
	.then( (playerArray) => {
		$scope.players = playerArray;
		$scope.$apply();
	});

	ClubFactory.getClubs()
	.then( (clubsArray) => {
		$scope.clubs = clubsArray;
		$scope.$apply();
	});

});