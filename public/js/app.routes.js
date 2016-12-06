(function() {
  "use strict";

  angular
    .module("loopsApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    
		$urlRouterProvider.otherwise("/welcome");
		
    $stateProvider
      .state("welcome", {
        url: "/welcome",
        templateUrl: "/partials/welcome.html",
        controller: "WelcomeController as welcome"
      })
      .state("login", {
        url: "/login",
        templateUrl:  "/partials/login.html",
				controller: "LoginController as login"
      })
      .state("register", {
        url: "/register",
        templateUrl: "/partials/register.html",
        controller: "RegisterController as register"
      })
			.state("hello", {
        url: "/hello",
        templateUrl: "/partials/hello.html",
        controller: "HelloController as hello"
      })
			.state("myStation", {
        url: "/MyStation",
        templateUrl:  "/partials/myStation.html"
      });

  }

})();
