myApp.controller('myCtrl',function ($scope, $http, $mdDialog) {
	$scope.filterChange = function(entityFilter){
		console.log(entityFilter)
		$scope.entityFilter = entityFilter;
		console.log($scope.entityFilter)
		$scope.workers.sync();
	}
    $scope.onChange = function(data){
		console.log(data)
		$scope.employee.selected = data;
		$scope.emp = data;

	  };
	$scope.emp = {id: 1,
	 name: "s", dep_id: 2,
	 sal: 1, birthDate: "1/2/2018",
	 hireDate:"1/2/2018",
	 mgr_id : 2
	};
	$scope.dep = {id: 1,
		name: "s", 
		head : "ka"
	};
	$scope.empl = {id: 1,
		name: "change", dep_id: 2,
		sal: 1, birthDate: "1/2/2018",
		hireDate:"1/2/2018",
		mgr_id : 2
	   };
	$scope.workers = new kendo.data.DataSource({
		autoSync: true,
		batch : true,
		transport : {
			read : {
				url : "../data/emp.json",
				dataType : "json"
			},
			create : {
				url : "../data/emp.json",
				dataType : "json"
			},
			update : {
				url : "../data/emp.json",
				dataType : "json"				
			},
			destroy : {
				url : "../data/emp.json",
				dataType : "json"				
			}
		},
		schema : {
			data : function (response) {
				return response
			},
			errors : "error",
			model : {
				id : "id",
				fields : {
					id : {
						type : "number",
						validation : {required : true, min : 0}
					},
					name : {
						validation : {required : true}
					},
					dep_id : {
						type : "number",
						validation : {required : true, min : 0}
					},
					sal : {
						type : "number",
						validation : {required : true, min : 0}
					},
					birthDate : {
						type : "Date",
						validation : {required : true}
					},
					hireDate : {
						type : "Date",
						validation : {required : true}
					},
					mgr_id : {
						type : "number",
						validation : {required : true, min : 0}
					}
				}
			}
		},
		error : function (e) {
			console.log(e.errors);
		}
	});

	 $scope.deleteFieldEmp = function(){
		 emp = $scope.employee.selected;
		 $scope.workers.remove(emp)

		console.log($scope.workers.data());
		$scope.employee.selected = false;
	 }
	 $scope.deleteManagment = function(){
		console.log("works") 
		var department = $scope.managment.selectedMan
		 $scope.depatments.remove(department)
	 }
	  $scope.onChangeMan = function(data){
		console.log(data);
		$scope.managment.selectedMan = data;
		$scope.dep = data;
	  }
	$scope.update = function(emp){
		console.log(emp)
		$scope.workers.data().map(function(item, index){
			if(item.id === emp.id){
				$scope.workers[index] = emp
			}
		});
		console.log($scope.workers.data());
		$scope.employee.selected = false;
		// var worker = $scope.workers.at(3);
		// worker.set(worker, emp);
		// $scope.workers.sync();
	}
	$scope.updateMan = function(dep){
		console.log("works?")
		$scope.depatments.data().map(function(item, index){
			if(item.id === dep.id){
				$scope.depatments[index] = dep
			}
		})
		console.log($scope.workers.data())
		$scope.managment.selectedMan = false
	}
	$scope.depatments = new kendo.data.DataSource({
		autoSync: true,
		batch : true,
		filterable: true,
		transport : {
			read : {
				url : "../data/dep.json",
				dataType : "json"
			},
			create : {
				url : "../data/dep.json",
				dataType : "json"				
			},
			update : {
				url : "../data/dep.json",
				dataType : "json"				
			},
			destroy : {
				url : "../data/dep.json",
				dataType : "json"				
			}
		},
		schema : {
			data : function (response) {
				return response
			},
			errors : "error",
			model : {
				id : "id",
				fields : {
					name : {
						validation : {required : true}
					},
					head : {
						validation : {required : true}
					}
				}
			}
		}	
	});

	$scope.workers.fetch(function() {
		var view = $scope.workers.view();
		console.log(view)
	});
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
	  editable: "inline",
	  filterable: {mode : "row"},
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
    $scope.deleteEmployee = function(data, dataItem, columns) {
		$scope.workers.fetch(function(data) {
			$scope.workers.remove(data);
			$scope.workers.sync();
		});
    };
 	$scope.gridOptionsMan = {
      sortable: true,
	  selectable : true,
	  editable: "inline",
	  filterable: {mode : "row"},
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

	$scope.addEmp = function (emp) {
		$scope.workers.add(emp);
		var data = $scope.workers.data();
		var lastItem = data[data.length - 1];
	};
	$scope.addDep = function (dep) {
		console.log("function wworks", dep)
		$scope.depatments.add(dep);
		var data = $scope.depatments.data();
		var lastItem = data[data.length - 1];
	};
	$scope.updateEmp = function (data) {
		console.log(data)
		$scope.selected = data;
	};


	$scope.sortCollumn = "name";
	$scope.reverseSort = false;
	$scope.sortData = function (collumn) {
		console.log("clicked")
		$scope.reverseSort = ($scope.sortCollumn == collumn) ? !$scope.reverseSort : false
		$scope.sortCollumn = collumn;
	};
})






