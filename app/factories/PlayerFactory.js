"use strict";

app.factory("TeamStorage", ($http, FBCreds) => {
	console.log("hi");

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
					console.log(playerObj);
					resolve(playerObj);
				})
					.error( (error) => {
						reject(error);
			});
		});
	};

	let getSinglePlayer = (playerId) => {
		return new Promise((resolve, reject) => {
			$http.get(`${FBCreds.URL}/Player/${playerId}.json`)
			.success( (playerObj) => {
				resolve(playerObj);
			})
			.error( (error) => {
				reject(error);
			});
		});
	};

	let postNewPlayer = (newPlayer) => {
		return new Promise( (resolve, reject) => {
			$http.post(`${FBCreds.URL}/Player.json`, angular.toJson(newPlayer))
			.success( (playerObj) => {
				resolve(playerObj);
			})
			.error( (error) => {
				reject(error);
			});
		});
	};

	return {getPlayerList, getSinglePlayer, postNewPlayer};
});