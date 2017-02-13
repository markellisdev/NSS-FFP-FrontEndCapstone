"use strict";

app.factory("TeamFactory", function($http, FBCreds)  {

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

	let getTeamPlayers = (teamID) => {
		let teamPlayers = [];
		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/FantasyPlayers.json?orderBy="teamID"&equalTo="${teamID}"`)
			.success( (playerObj) => {
				Object.keys(playerObj).forEach((fbKey) => {
					playerObj[fbKey].associationKey = fbKey;
					teamPlayers.push(playerObj[fbKey]);
				});
				resolve(teamPlayers);
			})
			.error( (error) => {
				reject(error);
			});
		});
	};

	let postNewTeam = (newTeam) => {
		console.log(newTeam);
		return new Promise( (resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/Teams.json`, angular.toJson(newTeam))
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
		console.log('userId', userId);
		let userTeamsArr = [];
		return new Promise((resolve, reject)=> {
			$http.get(`${FBCreds.databaseURL}/Teams.json?orderBy="uid"&equalTo="${userId}"`)
			.success((userTeams) => {
				Object.keys(userTeams).forEach((fbKey) => {
					userTeams[fbKey].teamID = fbKey;
					userTeamsArr.push(userTeams[fbKey]);
				});
				// console.log('userTeamsArr from getUserTeams', userTeamsArr);
				resolve(userTeamsArr);
			});
		});
	};

	let updateTeam = (team, id) => {
		return new Promise((resolve, reject) => {
			$http.patch(`${FBCreds.databaseURL}/Teams/${id}.json`, angular.toJson(team))
			.success(()=> {
				resolve(true);
			}
			);
		});
	};

	let deletePlayer = (id) => {
		return new Promise((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/FantasyPlayers/${id}.json`)
			.success(() => {
				resolve(true);
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

	return {getTeamList, getTeamPlayers, postNewTeam, getUserTeams, updateTeam, deletePlayer};
});