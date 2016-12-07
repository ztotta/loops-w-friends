(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("InstrumentsController", InstrumentsController);

  InstrumentsController.$inject = ["$state", "$scope"];

  function InstrumentsController($state, $scope) {
    var vm = this;
		
		vm.createSteps = createSteps;
		
		
		vm.instruments = [
			{
				name: "KICK",
				steps: [],
				muted: false,
				show: true
			},
			{
				name: "SNARE",
				steps: [],
				muted: false,
				show: false
			},
			{
				name: "HIHAT-CLOSED",
				steps: [],
				muted: false,
				show: false
			},
			{
				name: "HIHAT-OPEN",
				steps: [],
				muted: false,
				show: false
			},
			{
				name: "RIMSHOT",
				steps: [],
				muted: false,
				show: false
			},
			{
				name: "CLAP",
				steps: [],
				muted: false,
				show: false
			}
		];

		// For each instrument, call the steps to populate its panel:
		vm.instruments.forEach((instrument, index) => {
			createSteps(instrument, index);
		});
		
		function createSteps(instrument, index) {
			for (var i = 0; i < 64; i++) {
				if (i === 0 || i % 4) {
					var quarterNote = true;
				};
				instrument.steps.push(
					{
						id: `${instrument.name}${i}`,
						on: false,
						pressed: false,
						quarterNote: quarterNote
					}
				);
			};
		};
		
		vm.stepOnOff = function(step) {
			step.on = !step.on;
		};
		
		vm.stepPressed = function(step) {
			step.pressed = !step.pressed;
		};

    vm.$state = $state;

  }

})();
