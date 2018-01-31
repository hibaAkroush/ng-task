myApp.controller("toastCtrl", function($scope, $mdToast, $mdDialog){
    $scope.deleteFieldEmp = function (){
        
        emp = $scope.$$prevSibling.employee.selected;
        console.log("employe",emp)
        $scope.$$prevSibling.workers.remove(emp)

    //    console.log($scope.workers.data());
       $scope.$$prevSibling.employee.selected = false;
       $mdToast.hide()
    }
    $scope.closeToast  = function(){
        $scope.$$prevSibling.employee.selected = false;
        $mdToast.hide()
    }
})