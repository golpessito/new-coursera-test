(function(){
  'use strict';

  angular.module('ControllerAsAPP',[])
  .controller('ShoppingListController1',ShoppingListController1)
  .service('ShoppingListService',ShoppingListService)
  .factory("ShoppingListFactory",ShoppingListFactory)
  .directive('shoppingList',ShoppingList);

  function ShoppingList(){
    var ddo={
      templateUrl:'shoppingList.html',
      scope:{
        items: '<',
        title: '@'
      },
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  };

  function ShoppingListDirectiveController(){
    var list=this;
    list.cookiesInList=function(){
      for(var i=0; i<list.items.length; i++){
        var name=list.items[i].name;
        if(name.toLowerCase().indexOf("cookie")!==-1){
          return true;
        };
      };
      return false;
    };
  };

  ShoppingListController1.$inject=['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory){
    var list=this;
    var shoppingList=ShoppingListFactory();
    var origTitle="Shopping List #1 ";

    list.itemName="";
    list.itemQuantity="";
    list.items=shoppingList.getItems();
    list.title=origTitle+"( "+list.items.length+" items)";

    list.addItem=function(){
      shoppingList.addItem(list.itemName,list.itemQuantity);
      list.title=origTitle+"( "+list.items.length+" items)"
    };

    list.removeItem=function(index)
    {
      shoppingList.removeItem(index);
      list.title=origTitle+"( "+list.items.length+" items)"
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
