"use strict";

app.factory("MatchFactory", ($http, FBCreds) => {

	let getMatches = function(){

		let Matches = [];
		return new Promise(function(resolve, reject){
			$http.get(`${FBCreds.databaseURL}/SoccerFeed.json`)
			.success(function(data){
				resolve(data); //only resolve data in factory
			});
		});
	};

	return {getMatches};
});