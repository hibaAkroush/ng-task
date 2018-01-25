myApp.controller('myCtrl',function ($scope, $http, $mdDialog) {


	$scope.employee = {
        id: null,
        newUpdate : false
     };
     $scope.managment = {
        id: null,
        newUpdate : false
     };

	$scope.deleteEntity = function () {
		if($scope.employee.id === null){
			alert('Please Select An Employee')
			return
		}
		for (var i = 0; i < this.emps.length; i++) {
			if (this.emps[i].id === $scope.employee.id.id) {
				index = i
			}
		}
		if(confirm("are you sure you want to delete employee " + $scope.employee.id.name +" ?"))
		$scope.emps.splice(index,1)
	}
	$scope.deleteManagment = function () {
		if($scope.managment.id === null){
			alert('Please Select An Department')
			return
		}		
		for (var i = 0; i < this.deps.length; i++) {
			if (this.deps[i].id === $scope.managment.id.id) {
				index = i
			}
		}
		if(confirm("are you sure you want to delete Department " + $scope.managment.id.name +" ?"))
		$scope.deps.splice(index,1)

	}
	$scope.addEmp = function (emp) {
		console.log(emp, $scope.emps)
		if(emp.id === undefined){
			emp.id === $scope.emps.length
		}
		if (emp === undefined || emp.name  === undefined || emp.dep_id  === undefined || emp.sal  === undefined || emp.birthDate  === undefined || emp.hireDate  === undefined || emp.mgr_id  === undefined) {
			alert("please enter all fields")
		}
		else{
			$scope.emps.push(emp)
		}
	}
	$scope.addDep = function (dep) {
		console.log(dep)
		if (dep.id === undefined) {
			dep.id = $scope.deps.length
		}
		if (dep === undefined ||  dep.name === undefined || dep.head === undefined) {

			alert("please enter all fields")
			return
		}else{
			$scope.deps.push(dep)

		}
	}

	$scope.updateEmp = function (empl) {
		for (var i = 0; i < this.emps.length; i++) {
			if (this.emps[i].id === $scope.employee.id.id) {
				index = i
			}
		}
		this.emps[index].birthDate =  empl.birthDate
		this.emps[index].dep_id =  empl.dep_id
		this.emps[index].hireDate =  empl.hireDate
		if (!empl.id) {
			this.emps[index].id = this.emps[index].id
		}else{
			this.emps[index].id =  empl.id			
		}
		this.emps[index].mgr_id =  empl.mgr_id
		this.emps[index].name =  empl.name
		this.emps[index].sal =  empl.sal
	}
	$scope.check = function () {
		if($scope.employee.id === null){
			alert('Please Select')
			this.employee.newUpdate = false
			return
		}		
	}
	$scope.check = function () {
		if($scope.managment.id === null){
			alert('Please Select')
			this.managment.newUpdate = false
			return
		}		
	}

	$scope.updateMan = function (mang) {
		console.log(mang,this.deps )
		for (var i = 0; i < this.deps.length; i++) {
			if (this.deps[i].id === $scope.managment.id.id) {
				index = i
			}
		}
		if (!mang.id) {
			this.deps[index].id = this.deps[index].id
		}else{
			this.deps[index].id =  mang.id			
		}
		this.deps[index].head =  mang.head
		this.deps[index].name =  mang.name
	}
	$scope.sortCollumn = "name"
	$scope.reverseSort = false

	$scope.sortData = function (collumn) {
		console.log("clicked")
		$scope.reverseSort = ($scope.sortCollumn == collumn) ? !$scope.reverseSort : false
		$scope.sortCollumn = collumn
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



