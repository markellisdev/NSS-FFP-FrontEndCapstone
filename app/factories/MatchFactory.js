"use strict";

app.factory("ClubFactory", $http, FBCreds) => {

	let getMatchData = function(){

		let MatchData = [];
		return new Promise(function(resolve, reject){
			$http.get("../data/matchData.json")
			.success(function(data){
				console.log("data", data);
				resolve(data); //only resolve data in factory
			});
		});
	};

	return {getMatchData};
}