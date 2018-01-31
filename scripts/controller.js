myApp.controller('myCtrl',function ($scope, $http, $mdDialog, $mdToast, sharedDataService) {
	$scope.showDeleteToast = function() {
		if($scope.employee.selected){
			$mdToast.show({
			  hideDelay   : false,
			  position : "top right",
			  templateUrl : './toast.html',
			  controller  : 'toastCtrl'
			});
		}else{
			var message = "Please Select An Employee!"
			$mdToast.show($mdToast.simple({
			  hideDelay: 500,
			  position: 'top right',
			  content: message,
			  toastClass: 'error'
			}))
	  }
	}
	
	$scope.showDeleteToastMan = function() {
		
		if($scope.managment.selectedMan){
			$mdToast.show({
			  hideDelay   : false,
			  position : "top right",
			  templateUrl : './toastMan.html',
			  controller  : 'toastCtrl'
			});
		}else{
			var message = "Please Select A Department!"
			$mdToast.show($mdToast.simple({
			  hideDelay: 500,
			  position: 'top right',
			  content: message,
			  toastClass: 'error'
			}))
	  }
	}	
	$scope.confirmDelete = function(){
		console.log("confirmed")
	}
    $scope.onChange = function(data){
		
		console.log(data)
		$scope.employee.selected = data;
		sharedDataService.employee = $scope.employee;
		$scope.emp = data;
		console.log("change works and selected is",$scope.employee.selected )
	  };
	$scope.emp = {id: 1,
	 name: "s", dep_id:{depID :  2},
	 sal: 1, birthDate: "1/2/2018",
	 hireDate:"1/2/2018",
	 mgr_id : {mgrID:2}
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
		pageSize: 2,
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


	 $scope.deleteManagment = function(){
		console.log("works") 
		var department = $scope.managment.selectedMan
		 $scope.depatments.remove(department)
	 }
	  $scope.onChangeMan = function(data){
		console.log(data);
		$scope.managment.selectedMan = data;
		sharedDataService.managment = $scope.managment;
		$scope.dep = data;
		console.log(sharedDataService.managment)
	  }
	$scope.update = function(emp){
		emp.dep_id = emp.dep_id.depID;
		emp.mgr_id = emp.mgr_id.mgrID;
		console.log("update func",emp)
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
		pageSize: 2,
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
	sharedDataService.depatments = $scope.depatments
	$scope.workers.fetch(function() {
		var view = $scope.workers.view();
		console.log(view)
	});
	sharedDataService.workers  = $scope.workers;
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
	  pageable: true,
	  filterable: {mode : "row"},
	  dataSource : $scope.workers,
      columns: [{
	        field: "id",
	        title: "id",
			width: "120px",
			headerTemplate: 'ID <span class="k-icon k-i-kpi"></span>'
	        },{
			field: "name",
			headerTemplate: 'Name <span class="k-icon k-i-kpi"></span>',
	        title: "Name",
	        width: "120px"
	        },{
			field: "dep_id",
			headerTemplate: 'Department ID <span class="k-icon k-i-kpi"></span>',
	        title: "Department Id",
	        width: "120px"
	        },{
			field: "sal",
			headerTemplate: 'Salary <span class="k-icon k-i-kpi"></span>',
	        title: "Salary",
	        width: "120px"
	    	},{
			field: "birthDate",
			headerTemplate: 'Birth Date <span class="k-icon k-i-kpi"></span>',
	        title: "Birth Date",
	        width: "120px"
	        },{
	        field: "hireDate",
			title: "Hire Date",
			headerTemplate: 'Hire Date <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	    	},{
	        field: "mgr_id",
			title: "Manager ID",
			headerTemplate: 'Manager ID <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	    }],
    };

 	$scope.gridOptionsMan = {
      sortable: true,
	  selectable : true,
	  editable: "inline",
	  pageable: true,
	  filterable: {mode : "row"},
      dataSource : $scope.depatments,
      columns:  [{
	        field: "id",
			title: "id",
			headerTemplate: 'ID <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	        },{
	        field: "name",
			title: "Name",
			headerTemplate: 'Name <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	        },{
	        field: "head",
			title: "Head",
			headerTemplate: 'Head <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	    }]	
	};

	$scope.addEmp = function (emp) {
		console.log(emp)
		emp.dep_id = emp.dep_id.depID;
		emp.mgr_id = emp.mgr_id.mgrID;
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






