"use strict";

app.controller("NavCtrl", function(AuthFactory, $scope, $window){
	$scope.isLoggedIn = false;

	firebase.auth().onAuthStateChanged( function(user){
		if (user) {
			$scope.isLoggedIn = true;
			console.log("current user logged in", user, $scope.isLoggedin);
			$scope.$apply();
		}else{
			$scope.isLoggedIn = false;
			console.log("current user logged in", $scope.isLoggedin);
			$window.location.href = '#/login';
		}
	});

	$scope.logout = () => {
		AuthFactory.logoutUser()
	};


	// $scope.navItems = [
	// {
	// 	name: "Login/Register",
	// 	url: "/login"
	// },
	// {
	// 	name: "Logout",
	// 	url: "/",
	// }
	// ];
});