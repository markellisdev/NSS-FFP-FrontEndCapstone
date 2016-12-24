"use strict";

app.factory("TeamFactory", ($http, FBCreds) => {

				// let playerCollection = playerObj;
				// Object.keys(playerCollection).
				// 	forEach( (key) => {
				// 		playerCollection[key].id = key;
				// 		Player.push(playerCollection[key]);
				// 	})

	let getTeamList = () => {
		let TeamsArr = [];

		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/Teams.json`)
			.success((teamObj) => {
					// console.log("Are you getting TeamsArr?", teamObj);
					for (var obj in teamObj) {
						TeamsArr.push(teamObj[obj]);
					}
					resolve(TeamsArr);
				})
					.error( (error) => {
						reject(error);
			});
		});
	};

	let getSingleTeam = (teamId) => {
		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/Teams/${teamId}.json`)
			.success( (teamObj) => {
				resolve(teamObj);
			})
			.error( (error) => {
				reject(error);
			});
		});
	};

	let postNewTeam = (newTeam) => {
		console.log(newTeam);
		return new Promise( (resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/Team.json`, angular.toJson(newTeam))
			.success( (teamObj) => {
				getTeamList(teamObj);
				resolve(teamObj);
			})
			.error( (error) => {
				reject(error);
			});
		});
	};

	let getUserTeams = (userId) => {
		// console.log('userId', userId);
		let userTeamsArr = [];
		return new Promise((resolve, reject)=> {
			$http.get(`${FBCreds.databaseURL}/Teams.json?orderBy="uid"&equalTo="${userId}"`)
			.success((userTeams) => {
				Object.keys(userTeams).forEach((fbKey) => {
					userTeams[fbKey].id = fbKey;
					userTeamsArr.push(userTeams[fbKey]);
				});
				// console.log('userTeamsArr from getUserTeams', userTeamsArr);
				resolve(userTeamsArr);
			});
		});
	};

	// let playerHelper = (teamData) => {
	// 	for(var x=0; x<teamData.length; x++) {
	// 		let TeamsArr = teamData[x].Team;
	// 		for(var xx=0; xx<TeamsArr.length; xx++) {
	// 			var tempName = "-uID";
	// 			TeamsArr[xx].teamID = teamData[x][tempName];
	// 			console.log("This is TeamsArr xx ", TeamsArr[xx].teamID);
	// 			postNewPlayer(TeamsArr[xx]);
	// 		}
	// 	}
	// };

	return {getTeamList, getSingleTeam, postNewTeam};
});