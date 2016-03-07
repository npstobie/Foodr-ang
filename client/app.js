angular.module('app', [
  'ngRoute',
  'ngResource',
  'app.grid',
  'app.places-service'
]).config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'grid/grid.html',
    controller: 'grid-controller'
  })
}])
