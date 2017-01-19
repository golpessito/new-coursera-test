(function(){
  'use strict';

  angular.module('ShoppingList')
  .component('shoppingList',{
    templateUrl:'shoppingList.html',
    controller:ShoppingListComponentController,
    bindings:{
      items:'<',
      title:'@myTitle',
      onRemove:'&'
    }
  });

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

})();
