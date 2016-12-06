(function() {
	
	angular.module('loopsApp')
		.controller('HelloController', HelloController)
		.controller('LoginController', LoginController)
		.controller('RegisterController', RegisterController)
		.controller('WelcomeController', WelcomeController)
	
	HelloController.$inject = ["$state","$http"];
	LoginController.$inject = ["$state", "$http"];
	RegisterController.$inject = ["$state", "$http"];
	WelcomeController.$inject = ["$state", "$http"];
	
	function WelcomeController() {
		var vm = this;
	}
	
	function HelloController() {
		var vm = this;
	}
	
	function LoginController() {
		var vm = this;
	}
	
	function RegisterController($http) {
		var vm = this;
		
		$http({
			url: 'login',
			method: 'POST',
			data: {
				email: this.email,
				password: this.password
			}
		})
	}
	
})()
