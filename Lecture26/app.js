(function(){
  'use strict';

  angular.module('ControllerAsAPP',[])
  .controller('ShoppingListController1',ShoppingListController1)
  .controller('ShoppingListController2',ShoppingListController2)
  .service('ShoppingListService',ShoppingListService)
  .factory("ShoppingListFactory",ShoppingListFactory)
  .directive('listItemDescription',ListItemDescription)
  .directive('listItem',ListItem);

  function ListItem(){
    var ddo={
      templateUrl:'listItem.html'
    }

    return ddo;
  };

  function ListItemDescription(){
    var ddo = {
      template: '{{item.quantity}} of {{item.name}}'
    };

    return ddo;
  };

  ShoppingListController1.$inject=['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory){
    var list=this;
    var shoppingList=ShoppingListFactory();

    list.itemName="";
    list.itemQuantity="";
    list.items=shoppingList.getItems();

    list.addItem=function(){
      shoppingList.addItem(list.itemName,list.itemQuantity);
    };

    list.removeItem=function(index){
    shoppingList.removeItem(index);
    };

  };

  ShoppingListController2.$inject=['ShoppingListFactory'];
  function ShoppingListController2(ShoppingListFactory){
    var list=this;
    var shoppingList=ShoppingListFactory(3);

    list.itemName="";
    list.itemQuantity="";
    list.items=shoppingList.getItems();

    list.addItem=function(){
      try
      {
       shoppingList.addItem(list.itemName,list.itemQuantity);
      }
      catch(error)
      {
        list.error=error.message;
      }

    };

    list.removeItem=function(index){
      shoppingList.removeItem(index);
    };
  };

  function ShoppingListService(maxItem){
    var service=this;
    var items=[];

    service.getItems=function(){
      return items;
    };

    service.addItem=function(itemName,itemQuantity){

      if(maxItem===undefined ||
        (maxItem!==undefined && items.length < maxItem)){
        var item={
          name:itemName,
          quantity:itemQuantity
        };

        items.push(item);
      }
      else
      {
        throw new Error("Max items (" + maxItem + ") reached.");
      }

    };

    service.removeItem=function(index){
      items.splice(index,1);
    };

  };

  function ShoppingListFactory(){
    var factory=function(maxItem){
      return new ShoppingListService(maxItem);
    };

    return factory;
  };

})();
