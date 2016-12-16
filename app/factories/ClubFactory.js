"use strict";

app.factory("ClubFactory", ($http, FBCreds) => {

// This factory is to get data from json file to be parsed in controller for Firebase POST of all EPL Clubs

	let getClubData = function(){

		let ClubData = [];
		return new Promise(function(resolve, reject){
			$http.get("../data/teamData.json")
			.success(function(data){
				console.log("Club Factory )data", data);
				resolve(data); //only resolve data in factory
			});
		});
	};

	return {getClubData};
});