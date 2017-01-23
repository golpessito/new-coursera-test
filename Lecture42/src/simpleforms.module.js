(function(){
  'use strict';

  angular.module('SimpleFormsApp',[])
  .controller('RegistrationController',RegistrationController);

  function RegistrationController(){
    console.log("Entramos");
    var reg=this;

    reg.user={
      name:"",
      email:"",
      phone:""
    };

    reg.submit=function(){
      reg.completed=true;
    };

  };
})();
