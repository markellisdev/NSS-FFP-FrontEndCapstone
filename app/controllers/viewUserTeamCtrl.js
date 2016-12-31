'use strict';

// Controller for viewing all of a user's teams

app.controller('UserTeamsCtrl', function($scope, AuthFactory, TeamFactory){

	let currentUser = AuthFactory.getUser();

	$scope.getMyTeams = function (currentUser) {
		console.log("currentUser in getMyTeams is", currentUser);
		TeamFactory.getUserTeams(currentUser)
		.then((data) => {
			console.log('data', data);
			$scope.teams = data;
			console.log('$scope.teams', $scope.teams);

			// $scope.teams.forEach((team) => {
			// 	FantasyPlayerFactory.getAllTeamPlayers(team.id)
			// 	.then(function(data){
			// 		console.log('data', data);
			// 		team.pins = data;
			// 	});
			// $scope.$apply();

			// });

			$scope.$apply();

		});
	};

	// console.log('$scope.teams', $scope.teams);

});
