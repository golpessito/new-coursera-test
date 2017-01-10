(function(){
  'use strict';

  angular.module('ControllerAsAPP',[])
  .controller('ShoppingListController1',ShoppingListController1)
  .service('WeightLossFilterService',WeightLossFilterService)
  .service('ShoppingListService',ShoppingListService);

  WeightLossFilterService.$inject=['$q','$timeout'];
  function WeightLossFilterService($q,$timeout){
    var service=this;

    service.checkName=function(name){

      var deferred=$q.defer();
      var result={
        message:""
      };

      $timeout(function(){
        if(name.toLowerCase().indexOf("cookie")===-1){
          deferred.resolve(result);
        }
        else{
          result.message="Stay away from cookies, Yaakov!";
          deferred.reject(result);
        }
      },3000)

      return deferred.promise;
   };

   service.checkQuantity=function(quantity){

     var deferred=$q.defer();
     var result={
       message:""
     };

     $timeout(function(){
       if(quantity < 6)
       {
         deferred.resolve(result);
       }
       else{
         result.message="Too Much, Yaakov!";
         deferred.reject(result);
       }
     },1000)

     return deferred.promise;
  };

 };

  ShoppingListService.$inject=['$q','WeightLossFilterService'];
  function ShoppingListService($q,WeightLossFilterService){
    var service=this;
    var items=[];

    service.getItems=function(){
      return items;
    };

    service.addItem=function(itemName,itemQuantity){
      var promise=WeightLossFilterService.checkName(itemName);

      promise.then(function (response){
        var nextPromise=WeightLossFilterService.checkQuantity(itemQuantity);

        nextPromise.then(function (result){
          var item={
            name:itemName,
            quantity:itemQuantity
          };

          items.push(item);

        },
        function(errorResponse){
          console.log(errorResponse.message);
        });
      },
      function (errorResponse){
        console.log(errorResponse.message);
      });

    };

    service.removeItem=function(index){
      items.splice(index,1);
    };
  };

  ShoppingListController1.$inject=['ShoppingListService'];
  function ShoppingListController1(ShoppingListService){
    var list1=this;

    list1.itemName="";
    list1.itemQuantity="";
    list1.items=ShoppingListService.getItems();

    list1.addItem=function(){
      ShoppingListService.addItem(list1.itemName,list1.itemQuantity);
    };

    list1.removeItem=function(index){
      ShoppingListService.removeItem(index);
    };

  };

})();
