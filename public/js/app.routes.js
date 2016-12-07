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
        controller: "WelcomeController as welcome",
				data: {
					restricted: 'all'
				}
      })
      .state("login", {
        url: "/login",
        templateUrl:  "/partials/login.html",
				controller: "LoginController as login",
				data: {
					restricted: 'logout'
				}
      })
      .state("register", {
        url: "/register",
        templateUrl: "/partials/register.html",
        controller: "RegisterController as register",
				data: {
					restricted: 'logout'
				}
      })
			.state("hello", {
        url: "/hello",
        templateUrl: "/partials/hello.html",
        controller: "HelloController as hello",
				data: {
					restricted: 'login'
				}
      })
			.state("myStation", {
        url: "/MyStation",
        templateUrl:  "/partials/myStation.html",
				data: {
					restricted: 'login'
				}
      })
			.state("logout", {
        url: "/logout",
				controller: "LogoutController as logout",
				data: {
					restricted: 'all'
				}
      });

  }
	
	

})();
