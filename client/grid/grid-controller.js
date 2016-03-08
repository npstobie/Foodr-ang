angular.module('app.grid', [])

.controller('grid-controller', function($scope, PlacesService) {


	$scope.$watch(function () { return PlacesService.current }, function (newVal, oldVal) {
    if (typeof newVal !== 'undefined') {
        
        $scope.name = PlacesService.current.name;

        $scope.image = PlacesService.current.image

        $scope.nextImage = PlacesService.nextPlace.image;

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

	//JS for tinder cards
	$(document).ready(function(){

	    $(".buddy").on("swiperight",function(){
	      $(this).addClass('rotate-left').delay(700).fadeOut(1);
	      setTimeout(function(){$scope.next();},300);
	      $('.buddy').find('.status').remove();

	      $(this).append('<div class="status like">Like!</div>');      
	      if ( $(this).is(':last-child') ) {
	        $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
	       } else {
	          $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
	       }
	    });  

	    $(".buddy").on("swipeleft",function(){
	    $(this).addClass('rotate-right').delay(700).fadeOut(1);
	    $scope.next();
	    $('.buddy').find('.status').remove();
	    $(this).append('<div class="status dislike">Dislike!</div>');

	    if ( $(this).is(':last-child') ) {
	     $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
	     } else {
	        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
	    } 
	  });

	});

})

