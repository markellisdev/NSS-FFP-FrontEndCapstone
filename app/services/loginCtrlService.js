"use strict";

app.service("LoginCtrlService",[
	'$rootScope', 'FFP-APP.services.dataService', 'AuthFactory',
	function($rootScope, dataService, AuthFactory) {

		var service = {};

		service.teamID = null;

		service.Players = [];

		service.account = {
		email: "",
		password: "",
		uid: ""
		};

		service.login = (account, callback) => {
				AuthFactory.loginUser(account)
				.then( (user) => {
					service.account.uid = user.uid;
					service.account.email = user.email;
					callback();
				})
				.catch(function(error){
				  console.log('Error logging in: ', error);
				  alert("Either the username or password is incorrect. Please try again");
				});
			};

	return service;
	}
]);