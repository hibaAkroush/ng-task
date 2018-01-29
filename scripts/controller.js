myApp.controller('myCtrl',function ($scope, $http, $mdDialog) {
	$scope.emp = {id: 1,
	 name: "s", dep_id: 2,
	 sal: 1, birthDate: "1/2/2018",
	 hireDate:"1/2/2018",
	 mgr_id : 2
	}
	$scope.workers = new kendo.data.DataSource({
		transport : {
			read : {
				url : "../data/emp.json",
				dataType : "json"
			}
		}
	});
	$scope.depatments = new kendo.data.DataSource({
		transport : {
			read : {
				url : "../data/dep.json",
				dataType : "json"
			}
		}
	});
	$scope.depatments.fetch(function() {
		var view = $scope.depatments.view();
		console.log(view.length); // displays "1"
		console.log(view[0].name); // displays "Tea"
	});

	$scope.actions = [
	{ text: 'Okay' }
	];
	$scope.dropDataSourceDep = {
		data : [{depName : "Department one",
				 depID : 1},
				 {
				 depName : "Department two",
				 depID : 2
				 },{				 
				 depName : "Department three",
				 depID : 3},{
				 depName : "Department four",
				 depID : 4
				 }]
	};
	$scope.dropDataSourceMgr = {
		data : [{mgrName : "husam",
				 mgrID : 1},
				 {
				 mgrName : "badr",
				 mgrID : 2
				 },{				 
				 mgrName : "salam",
				 mgrID : 3},{
				 mgrName : "osama",
				 mgrID : 4
				 }]
	};
	$scope.employee = {
        id: null,
        newUpdate : false
     };
     $scope.managment = {
        id: null,
        newUpdate : false
     };
	$scope.gridOptionsEmp = {
      sortable: true,
      selectable: true,
      dataSource : $scope.workers,
      columns: [{
	        field: "id",
	        title: "id",
	        width: "120px"
	        },{
	        field: "name",
	        title: "Name",
	        width: "120px"
	        },{
	        field: "dep_id",
	        title: "Department Id",
	        width: "120px"
	        },{
	        field: "sal",
	        title: "Salary",
	        width: "120px"
	    	},{
	        field: "birthDate",
	        title: "Birth Date",
	        width: "120px"
	        },{
	        field: "hireDate",
	        title: "Hire Date",
	        width: "120px"
	    	},{
	        field: "mgr_id",
	        title: "Manager ID",
	        width: "120px"
	    }],
    };
 	$scope.gridOptionsMan = {
      sortable: true,
      selectable : true,
      dataSource : $scope.depatments,
      columns:  [{
	        field: "id",
	        title: "id",
	        width: "120px"
	        },{
	        field: "name",
	        title: "Name",
	        width: "120px"
	        },{
	        field: "head",
	        title: "Head",
	        width: "120px"
	    }]	
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
	this.cope.checked = false
	};
	$scope.deleteManagment = function () {
		console.log(this.cope.checked)
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
	this.cope.checked = false

	};
	$scope.addEmp = function (emp) {
		emp.dep_id = Number(emp.dep_id.depID)
		emp.mgr_id = Number(emp.mgr_id.mgrID)
		if (emp === undefined || emp.name  === undefined || emp.dep_id  === undefined || emp.sal  === undefined || emp.birthDate  === undefined || emp.hireDate  === undefined || emp.mgr_id  === undefined) {
			console.log("in if")
			alert("please enter all fields")
		}
		else{
			if(emp.id === undefined){
				console.log(emp.dep_id, emp.mgr_id)
				emp.id === $scope.emps.length
			}
			employyes = retrueve.data()
			console.log("data here before data: ",retrueve, "    after    ",employyes	)

			employyes.push(emp)
			console.log("data here after push: ",employyes	)
		}
	};
	$scope.addDep = function (dep) {
		console.log(dep)

		if (dep === undefined ||  dep.name === undefined || dep.head === undefined) {

			alert("please enter all fields")
			return
		}else{
			if (dep.id === undefined) {
				dep.id = $scope.deps.length
			}
			$scope.deps.push(dep)

		}
	};
	$scope.updateEmp = function (empl) {
		console.log(empl)
		empl.mgr_id = Number(empl.mgr_id.value)
		empl.dep_id = Number(empl.dep_id.value)
		console.log(empl)
		if (empl === undefined || empl.name  === undefined || empl.dep_id  === undefined || empl.sal  === undefined || empl.birthDate  === undefined || empl.hireDate  === undefined || empl.mgr_id  === undefined) {
			alert("please enter all fields")
		}
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
	};
	$scope.checkEmp = function () {
		if($scope.employee.id === null){
			alert('Please Select')
			this.employee.newUpdate = false
			return
		}		
	};
	$scope.checkMan = function () {
		if($scope.managment.id === null){
			alert('Please Select')
			this.managment.newUpdate = false
			return
		}		
	};
	$scope.updateMan = function (mang) {
		if (mang === undefined ||  mang.name === undefined || mang.head === undefined) {

			alert("please enter all fields")
			return
		}
		console.log(mang,this.deps )
		for (var i = 0; i < this.deps.length; i++) {
			if (this.deps[i].id === $scope.managment.id.id) {
				index = i;
			}
		}
		if (!mang.id) {
			this.deps[index].id = this.deps[index].id;
		}else{
			this.deps[index].id =  mang.id;	
		}
		this.deps[index].head =  mang.head;
		this.deps[index].name =  mang.name;
	};
	$scope.sortCollumn = "name";
	$scope.reverseSort = false;
	$scope.sortData = function (collumn) {
		console.log("clicked")
		$scope.reverseSort = ($scope.sortCollumn == collumn) ? !$scope.reverseSort : false
		$scope.sortCollumn = collumn;
	};
})






