(function(){
  'use strict';

  angular.module('ShoppingList')
  .service('WeightLossFilterService',WeightLossFilterService);

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

})();
