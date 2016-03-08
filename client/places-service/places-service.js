angular.module('app.places-service', [])
.service('PlacesService', function($http, $resource, $location) {

	var key = "";

	var scopeData = {
		idx: 0
	};

	scopeData.getLocation = function(coordinates) {
		$http.post('/location', coordinates).success(function(data){
		  	var obj;
		  	console.log(scopeData.places)
		  	if (scopeData.places[scopeData.idx].photos) {
		  		obj = {
		    		id: scopeData.places[scopeData.idx].place_id,
		    		ref: scopeData.places[scopeData.idx].photos[0].photo_reference
		    	}
		  	} else {
		  		obj = {
		  		  	id: scopeData.places[scopeData.idx].place_id,
		  		}
		  	}
		    $http.post('/currentLocation', obj)
		      .success(function(data){
		      scopeData.current = formatData(data.result);
		    }).error(function(data){
		      console.log('ERROR invalid request to google place_id', data);
		    })

		    scopeData.idx++;
	    	if (scopeData.places[scopeData.idx].photos) {
	    		obj = {
	      			id: scopeData.places[scopeData.idx].place_id,
	      			ref: scopeData.places[scopeData.idx].photos[0].photo_reference
	      		}
	    	} else {
	    		obj = {
	    		  	id: scopeData.places[scopeData.idx].place_id,
	    		}
	    	}
	      	$http.post('/currentLocation', obj)
	        	.success(function(data){
	       		scopeData.nextPlace = formatData(data.result);
	       		console.log(scopeData.nextPlace);
	        	scopeData.idx++;
	      	}).error(function(data){
	        	console.log('ERROR invalid request to google place_id', data);
	      	})

		}).error(function(data){
		  console.log('ERROR invalid request to google places API');
		})
	}

	scopeData.next = function() {
		scopeData.current = scopeData.nextPlace;
		if (scopeData.places[scopeData.idx].photos) {
			obj = {
	  			id: scopeData.places[scopeData.idx].place_id,
	  			ref: scopeData.places[scopeData.idx].photos[0].photo_reference
	  		}
		} else {
			obj = {
			  	id: scopeData.places[scopeData.idx].place_id,
			}
		}
		$http.post('/currentLocation', obj)
		.success(function(data){
		  scopeData.nextPlace = formatData(data.result);
		  scopeData.idx++;
		}).error(function(data){
		  console.log('ERROR invalid request to google place_id', data);
		})
	}

	var formatData = function(obj) {
	  return {
		  image: obj.image_link,
		  name: obj.name,
		  price: obj.rating,
		  address: obj.vicinity
		}
	} 

	setTimeout(function(){console.log(scopeData)}, 2000);

	return scopeData;

	// $scope.data = [];

	// $scope.latitude = geoplugin_latitude();

	// $scope.longitude = geoplugin_longitude();

	// $scope.coordinates = {lon: $scope.longitude, lat: $scope.latitude};

	// $scope.idx = 0;

	// $scope.places;

	// $http.post('/location', $scope.coordinates).success(function(data){
	//   console.log(data[0]);
	//   $scope.places = data;
	//     $http.post('/currentLocation', {id: $scope.places[$scope.idx].place_id}).success(function(data){
	//       $scope.formatData(data.result);
	//       $scope.idx++;
	//     }).error(function(data){
	//       console.log('ERROR invalid request to google place_id', data);
	//     })
	// }).error(function(data){
	//   console.log('ERROR invalid request to google places API');
	// })

	// $scope.idx = test.idx;

	// $scope.formatData = function(obj) {
	//   if (obj.photos) {
	//     $scope.image = 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' + obj.photos[0].photo_reference + '&sensor=false&maxwidth=800&key=AIzaSyBwa_30IwZd8X4DZ_-eeX5YP2YuypkXqx8';
	//   } else {
	//     $scope.image = "asdf"
	//   }
	//   $scope.name = obj.name;
	//   $scope.price = obj.rating;
	//   $scope.address = obj.vicinity;
	// } 


	// $scope.next = function() {
	//   $scope.formatData($scope.places[$scope.idx]);
	//   $scope.idx++;
	//   // $http.post('/currentLocation', {id: $scope.places[$scope.idx].place_id}).success(function(data){
	//   //   $scope.formatData(data.result);
	//   //   $scope.idx++;
	//   // }).error(function(data){
	//   //   console.log('ERROR invalid request to google place_id', data);
	//   // })
	// }

	// $scope.describe = function() {
	//   var idx = $scope.idx;
	//   $location.path('/description');
	//   $scope.idx = idx;
	//   var iframe = document.createElement('iframe');
	//   iframe.src = $scope.mapView
	//   console.log(iframe);
	//   setTimeout(function(){document.getElementById("maps").appendChild(iframe)},10)
	// } 

	// $scope.back = function() {
	//   var idx = $scope.idx;
	//   $location.path('/');
	//   $scope.idx = idx;
	// }


})
