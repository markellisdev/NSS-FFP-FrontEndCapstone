'use strict';

app.controller('AddTeamCtrl', ['$scope', '$rootScope','TeamStorage', '$location', 'TeamFactory', 'LoginCtrlService', function($scope, $rootScope, TeamStorage, $location, TeamFactory, LoginCtrlService){

		$scope.players = [];

		$scope.editYourTeam = function(){
			$scope.newFantasyTeam.teamID = LoginCtrlService.teamID;
			TeamFactory.updateTeam($scope.newFantasyTeam, LoginCtrlService.teamID)
			.then((response) => {
				console.log("response = ", response);
				$location.url("/team");
				$scope.$apply();
			});
		};
		$scope.$on("teamNameUpdated", function() {
			$scope.newFantasyTeam = {};
			$scope.newFantasyTeam.title = LoginCtrlService.title;
			$scope.newFantasyTeam.description = LoginCtrlService.description;
		});
		$scope.$on("playersUpdated", function(){
			$scope.players = LoginCtrlService.Players;
			$scope.$apply();
		});

		$scope.deleteTeamPlayer= function(player) {
			let associationID = player.associationKey;
			TeamFactory.deletePlayer(associationID)
			.then(() => {
				for (let i=0; i<$scope.players.length; i++) {
					var p = $scope.players[i];
					if (p.associationKey === associationID) {
						$scope.players.splice(i, 1);
						$scope.$apply();
						break;
					}
				}
			});
		};

		$scope.mySortFunction = function(item) {
			// debugger;
			switch ($scope.sortType) {
				case "playerScores":
					return parseInt(item.playerScores[0]);
				default: return item[$scope.sortType];
			}
		};
}]);