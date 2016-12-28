"use strict";

app.factory("MatchFactory", ($http, FBCreds) => {

	let getMatches = function(){

		let Matches = [];
		return new Promise(function(resolve, reject){
			$http.get(`${FBCreds.databaseURL}/SoccerFeed/SoccerDocument/MatchData.json`)
			.success((matchObj) => {
				for (var match in matchObj) {
					Matches.push(matchObj[match]);
				}
				resolve(Matches); //only resolve data in factory
			});
		});
	};

	return {getMatches};
});