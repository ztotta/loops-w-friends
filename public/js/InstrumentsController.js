(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("InstrumentsController", InstrumentsController);

  InstrumentsController.$inject = ["$state", "$scope"];

  function InstrumentsController($state, $scope) {
    var vm = this;
		
		vm.createInstruments = createInstruments;
		vm.createSteps = createSteps;
		
		vm.instrumentsList = ["KICK", "SNARE", "HIHAT-CLOSED", "HIHAT-OPEN", "RIMSHOT", "CLAP"];
		vm.instruments = [];

		vm.globalControls = [
			{ 
				name: "GLOBAL I/O",
				on: true
			}
		];
		
		vm.instrumentsList.forEach(instrument => {
			createInstruments(instrument);
		});
		
		function createInstruments(instrument) {
				vm.instruments.push({
					name: instrument,
					steps: [],
					muted: false,
					mutePressed: false,
					show: false
				});
			console.log(vm.instruments)
		};
		
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
