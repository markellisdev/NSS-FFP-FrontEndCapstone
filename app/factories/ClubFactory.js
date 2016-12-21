"use strict";

app.factory("ClubFactory", ($http, FBCreds) => {

// NOT ACTIVE - This factory is to get data from json file to be parsed in controller for Firebase POST of all EPL Clubs. It was used for the one time upload.

	let getClubData = function(){

		let ClubData = [];
		return new Promise(function(resolve, reject){
			$http.get("../data/teamData.json")
			.success(function(data){
				// console.log("Club Factory )data", data);
				resolve(data); //only resolve data in factory
			});
		});
	};

	let getClubList = function(){

		let ClubList = [];
		return new Promise(function(resolve, reject){
			$http.get("../data/teams.json")
			.success(function(data){
				// console.log("Club Factory )data", data);
				resolve(data); //only resolve data in factory
			});
		});
	};

	let getClubs= function(){

		let ClubList = [];

		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/Clubs.json`)
			.success((clubsObj) => {
				for (var obj in clubsObj) {
					ClubList.push(clubsObj[obj]);
				}
				resolve(ClubList);
			})
			.error( (error) => {
				reject(error);
			});
		});
	};

	return {getClubData, getClubList, getClubs};
});