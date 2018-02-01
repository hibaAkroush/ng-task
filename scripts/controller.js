myApp.controller('myCtrl',function ($scope, $http, $mdDialog, $mdToast, sharedDataService) {
	$scope.click = { 
		newUpdateEmp : "",
		newUpdateMan : ""
	};
	
	$scope.showDeleteToast = function() {
		if($scope.employee.selected){
			$mdToast.show({
			  hideDelay   : false,
			  position : "top right",
			  templateUrl : './toast.html',
			  controller  : 'toastCtrl',
			  toastClass : "normal"
			});
		}else{
			$scope.errorToast("Please Select An Employee!")

	    }
	};

	$scope.errorToast = function(message){
		$mdToast.show($mdToast.simple({
			hideDelay: 500,
			position: 'top right',
			content: message,
			toastClass: 'error'
		  }))
	};
	$scope.updateToast = function(){
		console.log("inside update", $scope.employee.selected)
		if(!$scope.employee.selected){
			$scope.errorToast("Please Select An Employee!");
			$scope.click.newUpdateEmp = false;
			console.log("inside update", $scope.employee.selected);
		}
	};
	$scope.updatToastMan = function(){
		if(!$scope.managment.selectedMan){
			$scope.errorToast("Please Select A Department!");
			$scope.click.newUpdateMan = false;
		}
	}
	$scope.showDeleteToastMan = function() {
		if($scope.managment.selectedMan){
			$mdToast.show({
			  hideDelay   : false,
			  position : "top right",
			  templateUrl : './toastMan.html',
			  controller  : 'toastCtrl',
			  toastClass : "normal"
			});
		}else{
			$scope.errorToast("Please Select A Department!")

	  }
	};

    $scope.onChange = function(data){
		console.log(data)
		$scope.employee.selected = data;
		sharedDataService.employee = $scope.employee;
		$scope.emp = data;
		console.log("change works and selected is",$scope.employee.selected )
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
	  
	$scope.onChangeMan = function(data){
		console.log(data);
		$scope.managment.selectedMan = data;
		sharedDataService.managment = $scope.managment;
		$scope.dep = data;
		console.log(sharedDataService.managment) 
	};

	$scope.update = function(emplo){
		console.log("inside update employeee",emplo)
		if(emplo === undefined || emplo.id === undefined || emplo.name === undefined || emplo.dep_id=== undefined || emplo.sal=== undefined || emplo.birthDate === undefined || emplo.hireDate === undefined || emplo.mgr_id=== undefined){
			console.log("one of these values is null :  ",emplo)
			$scope.errorToast("Please Enter All Fields!")
			$scope.employee.selected = false;
			return;
		}else{
			console.log("inside else", $scope.workers.data(), $scope.employee.selected )
			for (let index = 0; index < $scope.workers.data().length; index++) {
				console.log("inside for", $scope.workers.data()[index].id, $scope.employee.selected.id )
				if($scope.workers.data()[index].id === $scope.employee.selected.id){
					console.log($scope.workers.data()[index].id , $scope.employee.selected.id)
					console.log("found",$scope.workers.data()[index], emplo)
					$scope.workers.data()[index].id = emplo.id
					$scope.workers.data()[index].name = emplo.name					
					$scope.workers.data()[index].birthDate = emplo.birthDate
					$scope.workers.data()[index].sal = emplo.sal
					$scope.workers.data()[index].hireDate = emplo.hireDate
					$scope.workers.data()[index].mgr_id = emplo.mgr_id.mgrID 
					$scope.workers.data()[index].dep_id = emplo.dep_id.depID
					break;
				}
				
			}

			$scope.employee.selected = false;
			$scope.successToast("Employee Updated!")
		}
	};

	$scope.updateMan = function(depa){
		console.log(depa)
		if(depa.id === undefined || depa.name === undefined || depa.head===undefined){
			console.log("inside if")
			$scope.errorToast("Please Enter All Fields!")
			$scope.managment.selectedMan = false;
		}else{
			console.log($scope.depatments.data())
			$scope.depatments.data().map(function(item, index){
				console.log(item)
				if(item.id === $scope.managment.selectedMan.id){
					console.log("found!",item ,depa )
					item.id = depa.id
					item.name = depa.name
					item.head = depa.head

				}
			})	
			$scope.managment.selectedMan = false;
			$scope.successToast("Department Updated!");
		}
	};

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
	 console.log($scope.dropDataSourceDep)
	$scope.depFilter = function(element) {
		element.kendoDropDownList({
			dataSource : $scope.dropDataSourceDep.data.map(function(item,index){
				return item.depID;
			})
          });
	};
	$scope.mgrFilter = function(element) {
		element.kendoDropDownList({
			dataSource : $scope.dropDataSourceMgr.data.map(function(item,index){
				return item.mgrID;
			})
          });
	};
	$scope.gridOptionsEmp = {
      sortable: true,
      selectable: true,
	  editable: "inline",
	  pageable: true,
	  filterable : true,
	  dataSource : $scope.workers,
      columns: [{
	        field: "id",
	        title: "id",
			width: "120px",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		  	},
			headerTemplate: 'ID <span class="k-icon k-i-kpi"></span>'
	        },{
			field: "name",
			headerTemplate: 'Name <span class="k-icon k-i-kpi"></span>',
			title: "Name",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
	        width: "120px"
	        },{
			field: "dep_id",
			valuePrimitive: true,
			headerTemplate: 'Department ID <span class="k-icon k-i-kpi"></span>',
	        title: "Department Id",
			width: "120px",
			filterable: {
				extra : false,
				ui : $scope.depFilter
			}
	        },{
			field: "sal",
			headerTemplate: 'Salary <span class="k-icon k-i-kpi"></span>',
			title: "Salary",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
	        width: "120px"
	    	},{
			field: "birthDate",
			headerTemplate: 'Birth Date <span class="k-icon k-i-kpi"></span>',
	        title: "Birth Date",
			width: "120px",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			format: "{0:dd/MM/yyyy}"
	        },{
	        field: "hireDate",
			title: "Hire Date",
			headerTemplate: 'Hire Date <span class="k-icon k-i-kpi"></span>',
			width: "120px",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			format: "{0:dd/MM/yyyy}"
	    	},{
	        field: "mgr_id",
			title: "Manager ID",
			headerTemplate: 'Manager ID <span class="k-icon k-i-kpi"></span>',
			width: "120px",
			filterable: {
				extra : false,
				ui : $scope.mgrFilter
			}
	    }],
    };

 	$scope.gridOptionsMan = {
      sortable: true,
	  selectable : true,
	  editable: "inline",
	  pageable: true,
	  filterable: true,
      dataSource : $scope.depatments,
      columns:  [{
	        field: "id",
			title: "id",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			headerTemplate: 'ID <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	        },{
	        field: "name",
			title: "Name",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			headerTemplate: 'Name <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	        },{
	        field: "head",
			title: "Head",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			headerTemplate: 'Head <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	    }]	
	};
	$scope.checkIfUpdate = function(){
		if($scope.click.newUpdateEmp){
			$scope.click.newUpdateEmp = false;
		}
	}
	$scope.checkIfAdd  =  function(){
		console.log($scope.click.newEntity)
		if($scope.click.newEntity){
			$scope.click.newEntity = false;
		}
	}
	
	$scope.addEmp = function (emp) {
		
		if(emp.id === undefined || emp.name === undefined || emp.dep_id=== undefined || emp.sal=== undefined || emp.birthDate=== undefined || emp.hireDate=== undefined || emp.mgr_id=== undefined){
		$scope.errorToast("Please Fill All Fields!")
		}else{
			console.log(emp)
			emp.dep_id = emp.dep_id.depID;
			emp.mgr_id = emp.mgr_id.mgrID;
			$scope.workers.add(emp);
			var data = $scope.workers.data();
			var lastItem = data[data.length - 1];
			$scope.successToast("Successfully Added An Employee!");
		}
	};
	$scope.addDep = function (dep) {
		console.log("add department wworks", dep, dep.name === undefined)
		if(dep.id === undefined || dep.name === undefined || dep.head === undefined){
		console.log("detected")
		$scope.errorToast("Please Enter All Fields!")
		}else{
			$scope.depatments.add(dep);
			var data = $scope.depatments.data();
			var lastItem = data[data.length - 1];
			$scope.successToast("Successfully Added A Department!")
		}

	};
	$scope.successToast = function(message){
		$mdToast.show($mdToast.simple({
			hideDelay: 500,
			position: 'top right',
			content: message,
			toastClass: 'success'			
		}))
	};
	$scope.updateEmp = function (data) {
		console.log(data)
		$scope.selected = data;
	};

})






