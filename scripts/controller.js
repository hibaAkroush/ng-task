myApp.controller('myCtrl',function ($scope, $http) {
	$scope.employee = {
        id: null
     };
	$scope.deleteEntity = function () {
		index = $scope.employee.id
		if(confirm("are you sure?"))
		$scope.emps.splice(index,1)
	}

	$http.get('../data/dep.json')
	.then(function(response) {
    	$scope.deps = response.data
	})

	$http.get('../data/emp.json')
	.then(function(response) {
		console.log(response.data)
    	$scope.emps = response.data
	})
})