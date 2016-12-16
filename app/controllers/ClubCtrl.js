"use Strict";

app.controller('AddClubCtrl', function($scope, ClubFactory, $location, AuthFactory) {

	let currentUser = AuthFactory.getUser();

	$scope.clubs = []

	ClubFactory.getClubData()
	.then( (data) => {
		console.log("getting club data?", data);
		$scope.clubs = data.clubs; //data.guides to return array inside object
		$scope.$apply();

	});

})