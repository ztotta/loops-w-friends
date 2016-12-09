(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("InstrumentsController", InstrumentsController);

  InstrumentsController.$inject = ["$state", "$scope"];

  function InstrumentsController($state, $scope) {
    var vm = this;
		
		//// Assign variables: 
		vm.bpm = 95; 
		vm.beat = 160 / vm.bpm;
		vm.loopMs = vm.beat * 1000 * 4; 
		
		//// Assign functions:
		vm.createInstruments = createInstruments;
		vm.createSteps = createSteps;
		vm.globalLoopOn = globalLoopOn;
		vm.playStep = playStep;
		vm.setStepPromises = setStepPromises;
		
		//// Assign arrays:
		vm.instrumentsList = ["KICK", "SNARE", "HIHAT-CLOSED", "HIHAT-OPEN", "RIMSHOT", "CLAP"];
		vm.instruments = [];
		vm.globalControls = [
			{ 
				name: "GLOBAL I/O",
				on: false
			},
			{ 
				name: "TEMPO",
				on: true
			},
			{ 
				name: "KEY",
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
		}
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
		
		function globalLoopOn() {
//				playLoops(vm.instruments[0]);
//				playLoops(vm.instruments[1]);
			vm.instruments.forEach(instr => {
				playStep(instr);
			})
		}
		
		vm.i = -1;
		
		function setStepPromises() {
			Promise.all(vm.instruments.map(instr => {
				var x = new Promise((res, rej) => {
					setTimeout(() => {
						if (Math.floor(vm.i) < 63) {
							vm.i += 0.16666666666667;
							res();
						} else {
							setTimeout(() => {
								vm.i = -1;
							}, 115.38)
							rej("reject");
						}
					}, 100)
				})
				return x;
			}))
				.then(() => {
					vm.instruments.forEach((instr) => {
						playStep(instr)
					})
					setStepPromises();
				})
				.catch((reason) => {
					console.log(reason)
				})
		}
		
		function playStep(instr) {
			if (!instr.muted) {	
					console.log(Math.floor(vm.i), instr.steps[Math.floor(vm.i)].on, instr.name);
				if (instr.steps[Math.floor(vm.i)].on) {
					console.log('entered kick.play() area')
					if (instr.name === "KICK") { 
						console.log('should be playing kick')
						kick.play() 
					}
					else if (instr.name === "SNARE") { snare.play() }
				}
			}
		}
		
    vm.$state = $state;

  }

})();
