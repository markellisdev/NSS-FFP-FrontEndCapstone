'use strict';

app.controller('AddPlayerCtrl', function($scope, TeamStorage, $location, AuthFactory){

	let currentUser = AuthFactory.getUser();
	

	$scope.newPlayer = {
		'-uID': "",
		'Name': '',
		'Position': '',
		'Club_id': ''
	};

let player = 

	$scope.addNewPlayer = function(){
		PlayerFactory.postNewPlayer($scope.newPlayer)
		.then((response) => {
			// console.log("response = ", response);
			$location.url("/home");
			$scope.$apply();
		});
	};

});