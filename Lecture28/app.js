(function(){
  'use strict';

  angular.module('ControllerAsAPP',[])
  .controller('ShoppingListController1',ShoppingListController1)
  .controller('ShoppingListController2',ShoppingListController2)
  .service('ShoppingListService',ShoppingListService)
  .factory("ShoppingListFactory",ShoppingListFactory)
  .directive('shoppingList',ShoppingList);

  function ShoppingList(){
    var ddo={
      templateUrl:'shoppingList.html',
      scope:{
        list: '=myList',
        title: '@title'
      }
    };
    return ddo;
  };


  ShoppingListController1.$inject=['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory){
    var list1=this;
    var shoppingList=ShoppingListFactory();
    var origTitle="Shopping List #1 ";

    list1.itemName="";
    list1.itemQuantity="";
    list1.items=shoppingList.getItems();
    list1.title=origTitle+"( "+list1.items.length+" items)";

    list1.addItem=function(){
      shoppingList.addItem(list1.itemName,list1.itemQuantity);
      list1.title=origTitle+"( "+list1.items.length+" items)"
    };

    list1.removeItem=function(index)
    {
      shoppingList.removeItem(index);
      list1.title=origTitle+"( "+list1.items.length+" items)"
    };

  };

  ShoppingListController2.$inject=['ShoppingListFactory'];
  function ShoppingListController2(ShoppingListFactory){
    var list2=this;
    var shoppingList=ShoppingListFactory(3);

    list2.itemName="";
    list2.itemQuantity="";
    list2.items=shoppingList.getItems();

    list2.addItem=function(){
    try
    {
      shoppingList.addItem(list2.itemName,list2.itemQuantity);
    }
    catch(error)
    {
      list2.error=error.message;
    }

    };

    list2.removeItem=function(index){
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
