myApp.controller('myCtrl',function ($scope, $http) {


	$http.get('../data/dep.json')
	.then(function(response) {
    	$scope.dep = response.data
	})

	$http.get('../data/emp.json')
	.then(function(response) {
    	$scope.emp = response.data
	})
})