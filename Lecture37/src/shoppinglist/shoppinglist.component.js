(function(){
  'use strict';

  angular.module('ShoppingList')
  .component('shoppingList',{
    templateUrl:"src/shoppinglist/templates/shopping.template.html",
    bindings:{
      items:'<'
    }
  });

})();
