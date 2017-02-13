"use strict";

app.controller("NavCtrl", ['AuthFactory', '$scope', '$window', 'LoginCtrlService', function(AuthFactory, $scope, $window, LoginCtrlService){

	$scope.isLoggedIn = false;
	$scope.email = "";

	firebase.auth().onAuthStateChanged( function(user){
		if (user) {
			$scope.isLoggedIn = true;
			console.log("current user logged in", user, $scope.isLoggedIn);
			$scope.email = LoginCtrlService.account.email;
			$scope.$apply();
		}else{
			$scope.isLoggedIn = false;
			// console.log("current user logged in", $scope.isLoggedIn);
			// $window.location.href = '/login';
		}
	});

	$scope.logout = () => {
		AuthFactory.logoutUser();
	};
}]);