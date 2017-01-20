(function(){
  'use strict';

  angular.module('ShoppingList')
  .controller('MainShoppingListController',MainShoppingListController);

  MainShoppingListController.$inject=['ShoppingListService']
  function MainShoppingListController(ShoppingListService){
    var mainList=this;
    mainList.items=[];

    mainList.$onInit=function(){

      var promise=ShoppingListService.getItems();
      ShoppingListService.getItems()
      .then(function(result){
         mainList.items=result;
      });
    };
  };

})();
