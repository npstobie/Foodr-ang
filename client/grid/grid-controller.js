angular.module('app.grid', [])

.controller('grid-controller', function($scope, PlacesService) {

	$scope.$watch(function () { return PlacesService.current }, function (newVal, oldVal) {
    if (typeof newVal !== 'undefined') {
        
        $scope.name = PlacesService.current.name;

        $scope.image = PlacesService.current.image;

        $scope.price = PlacesService.current.price;

        $scope.address = PlacesService.current.address;

    }
	});
	
	$scope.coordinates = {
		lon: geoplugin_longitude(), 
		lat: geoplugin_latitude()
	};

	$scope.data = PlacesService.getLocation($scope.coordinates);

	$scope.name;

	$scope.image;

	$scope.price;

	$scope.address;

	$scope.next = PlacesService.next;


})