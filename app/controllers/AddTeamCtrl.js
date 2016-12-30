'use strict';

app.controller('AddTeamCtrl', function($scope, TeamStorage, $location, AuthFactory, TeamFactory){

	let currentUser = AuthFactory.getUser();


	$scope.newFantasyTeam = {
		'uID': currentUser,
		'title': '',
		'description': '',
		'teamID': ''
	};

	let player =

		$scope.addNewTeam = function(){
			TeamFactory.postNewTeam($scope.newTeam)
			.then((response) => {
				// console.log("response = ", response);
				$location.url("/team");
				$scope.$apply();
			});
	};

});