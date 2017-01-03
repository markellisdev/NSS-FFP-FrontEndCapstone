'use strict';

app.controller('AddPlayerCtrl', function($scope, PlayerFactory, $location, AuthFactory, TeamFactory, FantasyPlayerFactory){

	let currentUser = AuthFactory.getUser();

	TeamFactory.getUserTeams(currentUser)
		.then(function(allUserTeams) {
			$scope.userTeams = allUserTeams;
			$scope.$apply();
	});


	$scope.newFantasyPlayer = {
		'uid': "currentUser",
		'Name': '',
		'Position': '',
		'teamId': ''
	};

	let player =

		$scope.addNewPlayer = function(){
			let fantasyPlayer = $scope.newFantasyPlayer;
			FantasyPlayerFactory.postNewPlayer(fantasyPlayer)
			.then((response) => {
				PlayerFactory.getUserTeamPlayers(fantasyPlayer.teamId)
					.then((response) => {
						console.log("Fantasy player's teamId", fantasyPlayer.teamId);

					});
				// console.log("response = ", response);
				$location.url("/home");
				$scope.$apply();
			});
	};

});