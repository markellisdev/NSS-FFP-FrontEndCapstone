"use strict";

app.controller("NavCtrl", function($scope){
	$scope.navItems = {
		name: "Login/Register",
		url: "#/login"
	},
	{
		name: "Logout",
		url: "#/logout"
	};
});