(function(){
  'use strict';

  angular.module('ControllerAsAPP',[])
  .controller('ShoppingListController1',ShoppingListController1)
  .service('ShoppingListService',ShoppingListService)
  .factory("ShoppingListFactory",ShoppingListFactory)
  .component('shoppingList',{
    templateUrl:'shoppingList.html',
    controller:ShoppingListComponentController,
    bindings:{
      items: '<',
      title: '@',
      onRemove: '&'
    }
  });

  // function ShoppingList(){
  //   var ddo={
  //     templateUrl:'shoppingList.html',
  //     scope:{
  //       items: '<',
  //       title: '@',
  //       onRemove: '&'
  //     },
  //     controller: ShoppingListDirectiveController,
  //     controllerAs: 'list',
  //     bindToController: true
  //   };
  //   return ddo;
  // };

  ShoppingListComponentController.$inject=['$scope','$element'];
  function ShoppingListComponentController($scope,$element){
    var $ctrl=this;
    $ctrl.cookiesInList=function(){
      for(var i=0; i<$ctrl.items.length; i++){
        var name=$ctrl.items[i].name;
        if(name.toLowerCase().indexOf("cookie")!==-1){
          return true;
        };
      };
      return false;
    };

    $ctrl.remove=function(myIndex){
      $ctrl.onRemove({index:myIndex});
    };

    $ctrl.$onInit = function(){
      console.log("We are in $onInit()");
    }

    $ctrl.$onChanges=function(changeObj){
      console.log("Changes: ",changeObj);
    }

    $ctrl.$postLink=function(){
      $scope.$watch('$ctrl.cookiesInList();',function(newValue,oldValue){
        if(newValue===true){
          //Show Warning
          var warningElement=$element.find('div.error');
          console.log(warningElement);
          warningElement.slideDown(900);
        }
        else{
          //Hide Warning
          var warningElement=$element.find('div.error');
          warningElement.slideUp(900);
        }

      });
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
