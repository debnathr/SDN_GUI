angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';	

	var domAttributes = anime({
  targets: '#domAttributes input',
  value: 157,
  round: 1,
  easing: 'easeInOutExpo'
});

	var domAttributes1 = anime({
  targets: '#domAttributes1 input',
  value: 149,
  round: 1,
  easing: 'easeInOutExpo'
});


  $scope.texttodisplay = "Migration Started";

  $scope.master = 1;
  $scope.slave = 1;

});