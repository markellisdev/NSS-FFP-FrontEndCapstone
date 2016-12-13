"use strict";

app.factory("AuthFactory", function($window) {
	let currentUser = null;

	let createUser = function(userObj){
		return firebase.auth(). createUserWithEmailAndPassword(userObj.email, userObj.password);
	};

	let loginUser = function(userObj){
		return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password);
	};

	let logoutUser = function() {
		console.log("currentUser", isAuthenticated());
		return firebase.auth().signOut()
		.then(function(){
			console.log("sign out successful" );
			$window.location.url ="#";
		}), function(error) {
			console.log("An error happened");
		};
	};

	let isAuthenticated = function() {
		return new Promise( (resolve, reject) => {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					currentUser = user.uid;
					console.log("currentUser", currentUser);
					resolve(true);
				}
				else {
					resolve(false);
				}
			});
		});
	};



	let getUser = function() {
		return currentUser;
	};

console.log("get user on loginCtrl", getUser());


	return {createUser, loginUser, logoutUser, isAuthenticated, getUser};

});