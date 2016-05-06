/**
 * 
 */
function generateLevel(level) {

	var rngRange = function(generatorState) {
		return int( generatorState.baseRange.from + (generatorState.rng() * (generatorState.baseRange.to - generatorState.baseRange.from)) );
	};

	var getGeneratorState = function(level) {
		var rng = seedrandom('miby'+(level));
		return {
			rng: rng,
			level: level,
			baseRange: {
				from: null,
				to: null,
			},
			size: null,
			target: null,
			targetOperations: null,
			allowedOperations: null
			usefulTiles: null
			tiles: null,
			}
	};
	

	var genBaseRange = function(generatorState) {
		generatorState.baseRange.from = 0;
		generatorState.baseRange.to = (generatorState.level*generatorState.level)/4+(generatorState.level/2)+10;
	};

	var genSize = function(generatorState) {
		generatorState.size = 7;
	};

	var genTarget = function(generatorState) {
		generatorState.target = rngRange(generatorState);
	};

	var genTargetOperations = function(generatorState) {
		generatorState.targetOperations = int(rngRange(generatorState) / 5);
	};

	var genAllowedOperations = function(generatorState) {
		var ops = null;
		if(generatorState.level <= 2) {
			ops = ["+"];
		} else if(generatorState.level <= 5) {
			ops = ["+", "-"];
		} else {
			ops = ["+", "-", "*"];
		}
		generatorState.allowedOperations = ops;
	}

	var genUsefulTiles = function() {
		var usefulTiles = [];
		for (var i = 0; i < generatorState.targetOperations; i++) {
			
		};
	}

	generatorState = getGeneratorState(level);
	genBaseRange(generatorState);
	genSize(generatorState);
	getnTarget(generatorState);
	genUsefulNumbers();
	return generatorState;
}