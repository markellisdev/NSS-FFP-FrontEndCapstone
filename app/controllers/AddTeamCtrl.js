'use strict';

app.controller('AddTeamCtrl', function($scope, TeamStorage, $location, AuthFactory){

	let currentUser = AuthFactory.getUser();


	$scope.newPlayer = {
		'uID': currentUser,
		'Title': '',
		'Description': '',
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