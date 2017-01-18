(function(){
  'use strict';

  angular.module('ShoppingListEventsApp',[])
  .controller('ShoppingListController',ShoppingListController)
  .service('WeightLossFilterService',WeightLossFilterService)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .component('shoppingList',{
    templateUrl:'shoppingList.html',
    controller:ShoppingListComponentController,
    bindings:{
      items:'<',
      title:'@myTitle',
      onRemove:'&'
    }
  })
  .component('loadingSpinner',{
    templateUrl:'spinner.html',
    controller:SpinnerController
  });

  SpinnerController.$inject=['$rootScope'];
  function SpinnerController($rootScope){
   var $ctrl=this;
   $rootScope.$on('shoppinglist:processing',function(event,data){
     if(data.on)
     {
       $ctrl.showSippner=true;
     }
     else
     {
       $ctrl.showSippner=false;
     }
   });
  }

  ShoppingListComponentController.$inject=['$rootScope','$element','$q','WeightLossFilterService'];
  function ShoppingListComponentController($rootScope,$element,$q,WeightLossFilterService){
    var $ctrl=this;
    var totalItems;

    $ctrl.$onInit=function(){
      totalItems=0;
    };

    $ctrl.$doCheck=function(){
      if($ctrl.items.length!==totalItems){
        
        $rootScope.$broadcast('shoppinglist:processing',{on:true});
        totalItems=$ctrl.items.length;

        var promises=[];
        for(var i=0;i<$ctrl.items.length;i++){
          promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
        };

        $q.all(promises)
        .then(function(result){
          //Remove Cookie Warning
          var warningElement=$element.find("div.error");
          warningElement.slideUp(900);
        })
        .catch(function(result){
          //Show Cookie Warning
          var warningElement=$element.find("div.error");
          warningElement.slideDown(900);
        })
        .finally(function(){
          $rootScope.$broadcast('shoppinglist:processing',{on:false});
        });
      };
    };

  };

  WeightLossFilterService.$inject = ['$q', '$timeout']
  function WeightLossFilterService($q, $timeout) {
    var service = this;

    service.checkName = function (name) {
      var deferred = $q.defer();

      var result = {
        message: ""
      };

      $timeout(function () {
        // Check for cookies
        if (name.toLowerCase().indexOf('cookie') === -1) {
          deferred.resolve(result)
        }
        else {
          result.message = "Stay away from cookies, Yaakov!";
          deferred.reject(result);
        }
      }, 3000);

      return deferred.promise;
    };
  };

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
