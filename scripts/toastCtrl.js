myApp.controller("toastCtrl", function($scope, $mdToast, $mdDialog, sharedDataService){
    
    $scope.deleteFieldEmp = function (){
        console.log("from service:  ",sharedDataService.employee.selected)
        console.log("from sibling:  ",$scope.$$prevSibling.employee.selected)
        console.log(sharedDataService.workers === $scope.$$prevSibling.workers)
        emp = sharedDataService.employee.selected;
        // console.log("employe",emp)
        sharedDataService.workers.remove(emp)

    //    console.log($scope.workers.data());
       sharedDataService.employee.selected = false;
       $mdToast.hide()
    }
    $scope.closeToast  = function(){
        sharedDataService.employee.selected = false;
        $mdToast.hide()
    }
    $scope.deleteFieldMan = function (){
        console.log("in tost controllr", sharedDataService)
        department = sharedDataService.managment.selectedMan;
        sharedDataService.depatments.remove(department)
        sharedDataService.managment.selectedMan = false;
        $mdToast.hide()
    }
    $scope.closeToast  = function(){
        sharedDataService.managment.selectedMan = false;
        $mdToast.hide()
    }
})