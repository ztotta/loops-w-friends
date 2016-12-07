(function() {
	
	angular.module('loopsApp')
		.controller('HelloController', HelloController)
		.controller('LoginController', LoginController)
		.controller('RegisterController', RegisterController)
		.controller('WelcomeController', WelcomeController)
		.controller('LogoutController', LogoutController)
	
	HelloController.$inject = ["$state","$http", "$window"];
	LoginController.$inject = ["$state", "$http", "$window"];
	RegisterController.$inject = ["$state", "$http", "$window"];
	WelcomeController.$inject = ["$state", "$http"];
	LogoutController.$inject = ["$state", "$http", "$window"];
	
	function WelcomeController() {
		var vm = this;
	}
	
	function HelloController($state, $http, $window) {
		var self = this;
		
		JSON.parse(atob($window.localStorage.token.split('.')[1])).email
	}
	
	function LoginController($state, $http, $window) {
		var self = this;
		
		self.send = function() {
			$http({
				url: 'login',
				method: 'POST',
				data: {
					email: this.email,
					password: this.password
				}
			})
			.then(function(response) {
				console.log(response)
				if (response.data.error) {
					self.errors = response.data.error;
				} 
				else {
					$window.localStorage.setItem('token', response.data.token);
					$state.go('hello');
				}
			})
		}
		
	}
	
	function RegisterController($state, $http, $window) {
		var self = this;
		
		self.send = function() {
			if (self.password != self.confirmPassword) {
				self.errors = "Passwords do not match";
				return false;
			}
			
			$http({
				url: 'users',
				method: 'POST',
				data: {
					email: this.email,
					password: this.password
				}
			})
			.then(function(response) {
				console.log(response)
				if (response.data.error) {
					self.errors = response.data.error;
				} 
				else {
					$window.localStorage.setItem('token', response.data.token);
					$state.go('hello');
				}
			})
		};

	};
	
	function LogoutController($state, $http, $window) {
		$window.localStorage.removeItem('token')
		$state.go('welcome')
	}
	
})()
