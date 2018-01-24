var myApp = angular.module('myApp', [ 'ui.router'])

myApp.config(function($stateProvider){
  var managment = {
    name: 'man',
    url: '/',
    templateUrl: './managment.html'
  }

  var employees = {
    name: 'emp',
    url: '/emp',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(managment);
  $stateProvider.state(employees);

})
