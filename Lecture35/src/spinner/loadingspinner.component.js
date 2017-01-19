(function(){
  'use strict';

  angular.module('Spinner')
  .component('loadingSpinner',{
    templateUrl:'spinner.html',
    controller:SpinnerController
  });

  SpinnerController.$inject=['$rootScope'];
  function SpinnerController($rootScope){
   var $ctrl=this;
   var cancelListener=$rootScope.$on('shoppinglist:processing',function(event,data){
     if(data.on)
     {
       $ctrl.showSippner=true;
     }
     else
     {
       $ctrl.showSippner=false;
     }
   });

   $ctrl.$onDestroy=function(){
     cancelListener();
   };
 };

})();
