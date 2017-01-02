(function(){
  'use strict';

  angular.module('CounterApp',[])
  .controller('CounterController',CounterController);

  CounterController.$inject=['$scope','$timeout'];
  function CounterController($scope,$timeout){
    $scope.counter=0;

    $scope.upCounter=function(){

      $timeout(function(){
        $scope.counter++;
        console.log("Counter incremented!");
      },2000);

      //setTimeout(function(){
      //  $scope.$apply(function(){
      //    $scope.counter++;
      //    console.log("Counter incremented!");
      //  });
      //},2000);

      //setTimeout(function(){
      //  $scope.counter++;
      //  console.log("Counter incremented!");
      //  $scope.$digest();
      //},2000);


    };

    $scope.showNumberOfWatchers=function(){
      console.log("# Of Watchers: ",$scope.$$watchersCount);
    };

    $scope.$watch(function(){
      console.log("Digest Loop Fired.");
    });

    //$scope.$watch('onceCounter',function(newValue,oldValue){
    //  console.log("old value: ",oldValue);
    //  console.log("new value: ",newValue);
    //});

    //$scope.$watch('counter',function(newValue,oldValue){
    //  console.log("counter old value: ",oldValue);
    //  console.log("counter new value: ",newValue);
    //});


  };
})();
