"use strict";

app.factory("TeamStorage", ($http, FBCreds) => {

				// let playerCollection = playerObj;
				// Object.keys(playerCollection).
				// 	forEach( (key) => {
				// 		playerCollection[key].id = key;
				// 		Player.push(playerCollection[key]);
				// 	})

	let getPlayerList = () => {
		let players = [];

		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/Player.json`)
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
			$http.get(`${FBCreds.databaseURL}/Player/${playerId}.json`)
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
			$http.post(`${FBCreds.databaseURL}/Player.json`, angular.toJson(newPlayer))
			.success( (playerObj) => {
				getPlayerList(playerObj);
				resolve(playerObj);
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

	return {getPlayerList, getSinglePlayer, postNewPlayer};
});