angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';	

	var domAttributes = anime({
  targets: '#domAttributes input',
  value: 150,
  round: 1,
  easing: 'easeInOutExpo'
});

	var domAttributes1 = anime({
  targets: '#domAttributes1 input',
  value: 150,
  round: 1,
  easing: 'easeInOutExpo'
});

});