// angular.module('app', [
//   'ngRoute',
//   'ngResource',
//   'app.grid',
//   'app.spot',
//   'app.places-service'
// ]).config(['$routeProvider', function ($routeProvider) {
//   $routeProvider
//   .when('/', {
//     templateUrl: 'grid/grid.html',
//     controller: 'grid-controller'
//   })
//   .when('/spot', {
//   	templateUrl: 'spot/spot.html',
//   	controller: 'spot-controller'
//   })
//   .otherwise({ redirectTo: '/' });
// }])

angular.module('app', [
  'ui.router',
  'ngResource',
  'app.grid',
  'app.spot',
  'app.places-service'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);  
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'grid/grid.html'
    })
    .state('spot', {
      url: '/spot',
      templateUrl: 'spot/spot.html'
    })
})
