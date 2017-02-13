"use strict";

app.factory("FantasyPlayerFactory", ($http, FBCreds) => {

				// let playerCollection = playerObj;
				// Object.keys(playerCollection).
				// 	forEach( (key) => {
				// 		playerCollection[key].id = key;
				// 		Player.push(playerCollection[key]);
				// 	})

	let getAllTeamPlayers = () => {
		let players = [];

		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/FantasyPlayers.json`)
			.success((playerObj) => {
					// console.log("Are you getting players?", playerObj);
					for (var obj in playerObj) {
						players.push(playerObj[obj]);
					}
					resolve(players);
				})
					.error( (error) => {
						reject(error);
			});
		});
	};

	let getSinglePlayer = (playerId) => {
		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/FantasyPlayers/${playerId}.json`)
			.success( (playerObj) => {
				resolve(playerObj);
			})
			.error( (error) => {
				reject(error);
			});
		});
	};

	let postNewPlayer = (newPlayer) => {
		console.log(newPlayer);
		return new Promise( (resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/FantasyPlayers.json`, angular.toJson(newPlayer))
			.success( (playerObj) => {
				newPlayer.associationKey = playerObj.name;
				// getAllTeamPlayers(playerObj);
				resolve(newPlayer);
			})
			.error( (error) => {
				reject(error);
			});
		});
	};

	// let playerHelper = (teamData) => {
	// 	for(var x=0; x<teamData.length; x++) {
	// 		let players = teamData[x].Player;
	// 		for(var xx=0; xx<players.length; xx++) {
	// 			var tempName = "-uID";
	// 			players[xx].teamID = teamData[x][tempName];
	// 			console.log("This is players xx ", players[xx].teamID);
	// 			postNewPlayer(players[xx]);
	// 		}
	// 	}
	// };

	return {getAllTeamPlayers, getSinglePlayer, postNewPlayer};
});