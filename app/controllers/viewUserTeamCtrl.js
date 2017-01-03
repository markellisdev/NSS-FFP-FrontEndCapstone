'use strict';

// Controller for viewing all of a user's teams

app.controller('UserTeamsCtrl', function($scope, AuthFactory, TeamFactory, FantasyPlayerFactory){

	let user = AuthFactory.getUser();
	let userId = "QmSojNh8V3afkwTQRTethNTU8Th2";
	console.log("user inside viewUserTeamCtrl", user);


	$scope.getMyTeams = function () {
		TeamFactory.getUserTeams(userId)
		.then((data) => {
			console.log('data', data);
			$scope.teams = data;
			console.log('$scope.teams', $scope.teams);

			$scope.teams.forEach((team) => {
				FantasyPlayerFactory.getAllTeamPlayers(team.id)
				.then(function(data){
					console.log('data', data);
					team.players = data;
				});
			$scope.$apply();

			});

			$scope.$apply();

		});
	};

	// console.log('$scope.teams', $scope.teams);

});
