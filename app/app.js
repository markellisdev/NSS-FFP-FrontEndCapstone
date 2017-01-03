"use strict";

var app = angular.module("FFP-APP", ["ui.router", "dndLists"]);

// cut from above to use ui.router , "ngRoute"

/*-- Authenticate User --*/
let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
	AuthFactory.isAuthenticated()
	.then ( (userExists) => {
		if(userExists) {
			resolve();
		} else {
			reject();
		}
	});
});

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    	.state('root',{
    		url: '',
    		views: {
    			'header': {
    				templateUrl: 'partials/navbar.html',
    				controller: 'NavCtrl'
    			}
    		}
    	})
        .state('root.login', {
			url: '/login',
			views: {
				'container@': {
					templateUrl: 'partials/login.html',
					controller: 'LoginCtrl'
				}
			}

		})
		.state('root.home', {
		    url: '/team',
		    views: {

		        // the main template will be placed here (relatively named)
		        'container@': {
		        	templateUrl: 'partials/home.html'
		        },

		        // the child views will be defined here (absolutely named)
		        'userTeamView@root.home': {
		            templateUrl: 'partials/userTeamView.html',
		            	controller: 'AddTeamCtrl',
		            	resolve: {isAuth}
		        },

		        // child view two
		        'teamView@root.home': { templateUrl: 'partials/teamView.html', controller: 'PlayerListCtrl',
		        	resolve: {isAuth}
		    	},

		        // child view three
		        'fantasyTeamView@root.home': { templateUrl: 'partials/fantasyTeamView.html', controller: 'PlayerListCtrl',
		        	resolve: {isAuth}
		    	}


		    }

		})
		// .state('root.team', {
		//   url: '/team',
		//   views: {
		//     'container@': {
		//       templateUrl: 'partials/teamView.html',
		//       controller: 'PlayerListCtrl'
		//     }
		//   }
		// })
        .state('/test', {
		templateUrl: 'partials/test.html',
		controller: 'AddClubCtrl'
		});
		// .state('root.team', {
		// templateUrl: 'partials/teamView.html',
		// controller: 'PlayerListCtrl'
		// })
		// .state('/home', {
		// templateUrl: 'partials/home.html'
		// })
		// .state('root.userTeam', {
		// 	url: '',
		// 	views: {
		// 		'container@': {
		// 		templateUrl: 'partials/userTeamView.html',
		// 		controller: 'AddTeamCtrl'
		// 		}
		// 	}
		// });
});

// app.config(function($routeProvider) {
// 	$routeProvider
// 	.when('/login', {
// 		templateUrl: 'partials/login.html',
// 		controller: 'LoginCtrl'
// 	})
// 	.when('/test', {
// 		templateUrl: 'partials/test.html',
// 		controller: 'AddClubCtrl'
// 	})
// 	.when('/team', {
// 		templateUrl: 'partials/teamView.html',
// 		controller: 'PlayerListCtrl'
// 	})
// 	.when('/home', {
// 		templateUrl: 'partials/home.html'
// 	})
// 	.when('/userTeam', {
// 		templateUrl: 'partials/userTeamView.html',
// 		controller: 'AddTeamCtrl'
// 	})
// 	.otherwise('/home')
// ;
// // This bit of code below makes it so that routing works without !(bang)
// }).config(function($locationProvider){
// 	$locationProvider.html5Mode(true);
// });
app.run(['$rootScope', '$state', '$stateParams', '$location', 'FBCreds', function ($rootScope, $state, $stateParams, $location, FBCreds) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$state.transitionTo('root.home');
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain
	};
	firebase.initializeApp(authConfig);
}]);



