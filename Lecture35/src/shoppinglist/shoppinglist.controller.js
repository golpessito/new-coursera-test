(function(){
  'use strict';

  angular.module('ShoppingList')
  .controller('ShoppingListController',ShoppingListController);

  ShoppingListController.$inject=['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory){
    var list=this;
    var shoppingList=ShoppingListFactory();


    list.itemName="";
    list.itemQuantity="";
    list.items=shoppingList.getItems();
    var origTitle="List# 1 ( "+list.items.length+" ) items";
    list.title=origTitle;

    list.addItem=function(){
      shoppingList.addItem(list.itemName,list.itemQuantity);
      list.title="List# 1 ( "+list.items.length+" ) items";
    };

    list.removeItem=function(index){
      shoppingList.removeItem(index);
      list.title="List# 1 ( "+list.items.length+" ) items";
    };
  };

})();
