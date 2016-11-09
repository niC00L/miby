function generateLevel(seed, level) {

	var rngRange = function(generatorState) {
		return Math.round( generatorState.baseRange.from + (generatorState.rng() * (generatorState.baseRange.to - generatorState.baseRange.from)) );
	};

	var getGeneratorState = function(level) {
		var rng = new xor4096(seed+level);
		return {
			rng: rng,
			level: level,
			baseRange: {
				from: 0,
				to: 0,
			},
			size: 0,
			previousTarget: 0,
			target: 0,
			targetOperations: 0,
			targetUsefulOperations: 0,
			targetPossibilities: 0,
			allowedOperators: null,
			allowedOperations: null,
			usefulTiles: null,
			uselessTiles: null,
			map: null
		};
	};

	var genBaseRange = function(generatorState) {
		generatorState.baseRange.from = ((generatorState.level / -8.0 ));
		generatorState.baseRange.to = (generatorState.level * generatorState.level) / 16 + (generatorState.level / 6 ) + 4;
	};

	var genSize = function(generatorState) {
		generatorState.size = 7;
	};

	var genPreviousTarget = function(generatorState) {
		var prevGeneratorState = getGeneratorState(generatorState.level-1);

		genBaseRange(prevGeneratorState);
		genTarget(prevGeneratorState);

		generatorState.previousTarget = prevGeneratorState.target;
	};

	var genTarget = function(generatorState) {
		if(generatorState.level === 0) {
			generatorState.target = 0;
		} else {
			generatorState.target = rngRange(generatorState);
		}
	};

	var genTargetOperations = function(generatorState) {
		var c = generatorState.level + Math.E;
		generatorState.targetOperations = Math.round(Math.max(1 + level / 8, Math.min(generatorState.size * generatorState.size, generatorState.rng() * 
			(Math.log(c*c)*2) + (1 + generatorState.level/8)
			)));
	};

	var genTargetUsefulOperations = function(generatorState) {
		generatorState.targetUsefulOperations = Math.round(generatorState.targetOperations/2 + generatorState.rng() * generatorState.targetOperations/2);
	};

	var genTargetPossibilities = function(generatorState) {
		generatorState.targetPossibilities = Math.round(Math.max(1, Math.min(generatorState.targetUsefulOperations, 4 - (generatorState.level / 6))));
	};

	var genAllowedOperations = function(generatorState) {
		var opr = null;
		var ops = null;
		if(generatorState.level <= 2) {
			opr = ["plu"];
			ops = ["+"];
		} else if(generatorState.level <= 21) {
			opr = ["plu", "min"];
			ops = ["+", "-"];
		} else if(generatorState.level <= 42) {
			opr = ["plu", "min"];
			ops = ["+", "-", "*"];
		} else {
			opr = ["plu", "min", "tim", "div"];
			ops = ["+", "-", "*", "/"];
		}
		generatorState.allowedOperators = opr;
		generatorState.allowedOperations = ops;
	};

	var genUsefulTiles = function(generatorState) {
		generatorState.usefulTiles = [];

		var perPossibility = Math.round(generatorState.targetUsefulOperations / generatorState.targetPossibilities);

		for(i = 0; i < generatorState.targetPossibilities; i++) {
			var j = 0;
			var from_n = generatorState.previousTarget;
			var operation = null;

			while(generatorState.usefulTiles.length + 1 < generatorState.targetUsefulOperations && j <= perPossibility - 1) {
				
				operation = genUsefulOperation(from_n, false, generatorState);
				generatorState.usefulTiles.push(operation);

				from_n = applyOperation(operation, from_n);
				
				j++;
			}

			operation = genUsefulOperation(from_n, true, generatorState);
			generatorState.usefulTiles.push(operation);
		}
	};

	var genUselessTiles = function(generatorState) {

		var genRandomTile = function(generatorState) {
			return {
				number: rngRange(generatorState),
				operator: generatorState.allowedOperators[Math.round(generatorState.rng() * (generatorState.allowedOperators.length - 1))]
			};
		};

		generatorState.uselessTiles = [];

		while(generatorState.usefulTiles.length + generatorState.uselessTiles.length < generatorState.targetOperations) {
			generatorState.uselessTiles.push(genRandomTile(generatorState));
		}
	};

	var genMap = function(generatorState) {
		
		levelDecorator = new LevelDecorator(generatorState);
		generatorState.map = levelDecorator.decorateMap();
	};

	generatorState = getGeneratorState(level);

	genBaseRange(generatorState);
	genSize(generatorState);
	genPreviousTarget(generatorState);
	genTarget(generatorState);
	genTargetOperations(generatorState);
	genTargetUsefulOperations(generatorState);
	genTargetPossibilities(generatorState);
	genAllowedOperations(generatorState);
	genUsefulTiles(generatorState);
	genUselessTiles(generatorState);
	genMap(generatorState);

//	console.log(generatorState);

	return generatorState;
}