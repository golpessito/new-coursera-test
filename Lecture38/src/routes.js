(function(){
  'use strict';
  angular.module('ShoppingList')

  .config(RoutesConfig);

  RoutesConfig.$inject=['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider){

    // Redirect to home page if no others URL matches
    $urlRouterProvider.otherwise('/');

    //Home page
    $stateProvider
    .state('home',{
      url:'/',
      templateUrl:"src/shoppinglist/templates/home.template.html"
    })
    .state('mainList',{
      url:"/main-list",
      templateUrl:"src/shoppinglist/templates/main-shopping.template.html",
      controller:"MainShoppingListController as mainList",
      resolve:{
        items: ['ShoppingListService',function(ShoppingListService){
          return ShoppingListService.getItems();
        }]
      }

    })
  };

})();
