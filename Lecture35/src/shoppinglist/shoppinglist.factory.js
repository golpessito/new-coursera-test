(function(){
  'use strict';

  angular.module('ShoppingList')
  .factory('ShoppingListFactory',ShoppingListFactory);

  function ShoppingListService(){
    var service=this;
    var items=[];

    service.addItem=function(itemName,itemQuantity){
      var item={
        name:itemName,
        quantity:itemQuantity
      };

      items.push(item);
    };

    service.getItems=function(){
      return items;
    };

    service.removeItem=function(index){
      items.splice(index,1);
    };
  };

  function ShoppingListFactory(){
    var factory=function(){
      return new ShoppingListService();
    }
    return factory;
  };

})();
