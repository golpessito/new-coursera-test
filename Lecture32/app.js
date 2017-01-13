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
        title: '@',
        onRemove: '&'
      },
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true,
      link: ShoppingListDirectiveLink,
      transclude:true
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

  function ShoppingListDirectiveLink(scope,element,attrs,controller){
    console.log("Link scope is :",scope);
    console.log("Controller instance is: ",controller);
    console.log("Element is: ",element);

    scope.$watch("list.cookiesInList()",function(newValue,oldValue){
      console.log("Old Value: ",oldValue);
      console.log("New Value: ",newValue);
      if(newValue===true){
        displayCookieWarning();
      }
      else{
        removeCookieWarning();
      }
    });

    function displayCookieWarning(){
      //Using Angular jqLite
      // var warningElement=element.find("div");
      // warningElement.css('display','block');
      // console.log(warningElement);

      //Using JQuery
      var warningElement=element.find("div.error");
      warningElement.slideDown(900);
    };

    function removeCookieWarning(){
      //Using Angular jqLite
      // var warningElement=element.find("div");
      // warningElement.css('display','none');
      // console.log(warningElement);

      //Using JQuery
      var warningElement=element.find("div.error");
      warningElement.slideUp(900);


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
    list.lastRemoved=""
    list.title=origTitle+"( "+list.items.length+" items)";
    list.warning="COOKIES DETECTED!";

    list.addItem=function(){
      shoppingList.addItem(list.itemName,list.itemQuantity);
      list.title=origTitle+"( "+list.items.length+" items)"
    };

    list.removeItem=function(index)
    {
      list.lastRemoved="Last removed item was "+list.items[index].name;
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
