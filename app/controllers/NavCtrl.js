"use strict";

app.controller("NavCtrl", function(AuthFactory, $scope, $window){

	$scope.isLoggedIn = false;
	firebase.auth().onAuthStateChanged( function(user){
		if (user) {
			$scope.isLoggedIn = true;
			console.log("current user logged in", user, $scope.isLoggedIn);
			$scope.$apply();
		}else{
			$scope.isLoggedIn = false;
			console.log("current user logged in", $scope.isLoggedIn);
			// $window.location.href = '/login';
		}
	});

	$scope.logout = () => {
		AuthFactory.logoutUser();
	};
});