(function(){
  'use strict';

  angular.module('ControllerAsAPP',[])
  .controller('ShoppingListController',ShoppingListController)
  .provider('ShoppingListService',ShoppingListServiceProvider)
  .config(Config);

  Config.$inject=['ShoppingListServiceProvider'];
  function Config(ShoppingListServiceProvider){
    ShoppingListServiceProvider.defaults.maxItems=2;
  }

  ShoppingListController.$inject=['ShoppingListService'];
  function ShoppingListController(ShoppingListService){
    var list=this;;

    list.itemName="";
    list.itemQuantity="";
    list.items=ShoppingListService.getItems();

    list.addItem=function(){
      try
      {
       ShoppingListService.addItem(list.itemName,list.itemQuantity);
      }
      catch(error)
      {
        list.error=error.message;
      }
    };

    list.removeItem=function(index){
      ShoppingListService.removeItem(index);
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

  function ShoppingListServiceProvider(){
    var provider=this;

    provider.defaults={
      maxItems:10
    };

    provider.$get=function(){
      var shoppingList=new ShoppingListService(provider.defaults.maxItems);
      return shoppingList;
    }
  }
  
})();
