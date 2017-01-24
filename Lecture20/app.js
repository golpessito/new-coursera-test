(function(){
  'use strict';


  angular.module('ShoppingListApp',[])
  .controller("ShoppingListAddController",ShoppingListAddController)
  .controller("ShoppingListShowController",ShoppingListShowController)
  .service('ShoppingListService',ShoppingListService);


  ShoppingListAddController.$inject=['ShoppingListService'];
  function ShoppingListAddController(ShoppingListService){
    var itemAdder=this;
    itemAdder.itemName="";
    itemAdder.itemQuantity="";

    itemAdder.addItem=function(){
      ShoppingListService.addItem(itemAdder.itemName,itemAdder.itemQuantity);
    };
  };

  ShoppingListShowController.$inject=['ShoppingListService']
  function ShoppingListShowController(ShoppingListService){
    var showList=this;
    showList.items=ShoppingListService.getItems();

    showList.removeItem=function(index){
      ShoppingListService.removeItem(index);
    };
  };

  function ShoppingListService(){
    var service=this;

    //List of shopping items
    var items=[];

    service.getItems=function(){
      return items;
    };

    service.addItem=function(itemName,itemQuantity){
      var item={
        name:itemName,
        quantity:itemQuantity
      };

      items.push(item);
    };

    service.removeItem=function(index){
      items.splice(index,1);
    };

  };


})();
