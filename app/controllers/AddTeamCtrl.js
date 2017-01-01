'use strict';

app.controller('AddTeamCtrl', function($scope, TeamStorage, $location, AuthFactory, TeamFactory){

	let currentUser = AuthFactory.getUser();


	$scope.newFantasyTeam = {
		'uid': currentUser,
		'title': '',
		'description': '',
		'teamID': ''
	};

	let team =

		$scope.addNewTeam = function(){
			TeamFactory.postNewTeam($scope.newFantasyTeam)
			.then((response) => {
				console.log("response = ", response);
				$location.url("/team");
				$scope.$apply();
			});
	};

});