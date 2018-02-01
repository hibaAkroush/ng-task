myApp.controller("toastCtrl", function($scope, $mdToast, $mdDialog, sharedDataService){
    
    $scope.deleteFieldEmp = function (){
        emp = sharedDataService.employee.selected;
        sharedDataService.workers.remove(emp)
        sharedDataService.employee.selected = false;
        $mdToast.hide()
    };

    $scope.closeToastEmp  = function(){
        sharedDataService.employee.selected = false;
        $mdToast.hide()
    };

    $scope.deleteFieldMan = function (){
        console.log("in tost controllr", sharedDataService)
        department = sharedDataService.managment.selectedMan;
        sharedDataService.depatments.remove(department)
        sharedDataService.managment.selectedMan = false;
        $mdToast.hide()
    };

    $scope.closeToast  = function(){
        sharedDataService.managment.selectedMan = false;
        $mdToast.hide()
    };
})