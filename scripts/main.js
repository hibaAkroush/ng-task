var myApp = angular.module('myApp', [ 'ui.router', 'ngMaterial',  "kendo.directives"])

myApp.config(function($stateProvider){
  var managment = {
    name: 'man',
    url: '/',
    templateUrl: './managment.html'
  }

  var employees = {
    name: 'emp',
    url: '/emp',
    templateUrl: './employees.html'
  }

  $stateProvider.state(managment);
  $stateProvider.state(employees);

})
