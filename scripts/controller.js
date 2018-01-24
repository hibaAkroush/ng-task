myApp.controller('myCtrl',function ($scope, $http, $mdDialog) {


	$scope.employee = {
        id: null
     };
     $scope.managment = {
        id: null
     };
	$scope.deleteEntity = function () {
		for (var i = 0; i < this.emps.length; i++) {
			if (this.emps[i].id === $scope.employee.id.id) {
				index = i
			}
		}
		if(confirm("are you sure?"))
		$scope.emps.splice(index,1)
	}
	$scope.deleteManagment = function () {
		for (var i = 0; i < this.deps.length; i++) {
			if (this.deps[i].id === $scope.managment.id.id) {
				index = i
			}
		}
		if(confirm("are you sure?"))
		$scope.deps.splice(index,1)

	}
	$scope.addEmp = function (emp) {
		console.log(emp, $scope.emps)
		if (emp === undefined || emp.name  === undefined || emp.dep_id  === undefined || emp.sal  === undefined || emp.birthDate  === undefined || emp.hireDate  === undefined || emp.mgr_id  === undefined) {
			alert("please enter all fields")
		}
		else{
			$scope.emps.push(emp)
		}
	}
	$scope.addDep = function (dep) {
		if (dep === undefined ||  dep.name === undefined || dep.head === undefined) {
			alert("please enter all fields")
		}else{
			$scope.deps.push(dep)
		}

	}


	$http.get('../data/dep.json')
	.then(function(response) {
    	$scope.deps = response.data
	})

	$http.get('../data/emp.json')
	.then(function(response) {
    	$scope.emps = response.data
	})
})



