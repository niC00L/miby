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
		generatorState.baseRange.from = ((generatorState.level / -3.0 ));
		generatorState.baseRange.to = (generatorState.level * generatorState.level) / 4 + (generatorState.level / 2 ) + 10;
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
		generatorState.target = rngRange(generatorState);
	};

	var genTargetOperations = function(generatorState) {
		generatorState.targetOperations = Math.max(1 + Math.round(level / 8), Math.min(generatorState.size * generatorState.size, Math.round(rngRange(generatorState) / 6)));
	};

	var genTargetUsefulOperations = function(generatorState) {
		generatorState.targetUsefulOperations = Math.min(Math.round(rngRange(generatorState) / 2), generatorState.targetOperations);
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
		} else if(generatorState.level <= 15) {
			opr = ["plu", "min"];
			ops = ["+", "-"];
		} else if(generatorState.level <= 30) {
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

			while(generatorState.usefulTiles.length + 1 < generatorState.targetUsefulOperations && j <= perPossibility) {
				
				operation = genUsefulOperation(from_n, false, generatorState);
				generatorState.usefulTiles.push(operation);

				from_n = applyOperation(operation, from_n);
				
				/*
				var splitOn = Math.round(generatorState.rng() * (possibilityUsefulTiles.length - 2));
				var from_n = possibilityUsefulTiles[0].number;
				var to_n = null;
				for(j = 1; j <= splitOn; j++) {
					from_n = applyOperation(possibilityUsefulTiles[j], from_n);
				}
				if(possibilityUsefulTiles[splitOn+1].operator) {
					to_n = applyOperation(possibilityUsefulTiles[splitOn+1], from_n);
				} else {
					to_n = possibilityUsefulTiles[splitOn+1].number;
				}

				var tiles = splitToOperations(from_n, to_n, generatorState);
				
				while(tiles.length > 0) {
					splitOn++;
					possibilityUsefulTiles.splice(splitOn, 0, tiles.pop());
				}
				*/

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
		var tiles = generatorState.usefulTiles.concat(generatorState.uselessTiles);
		
		var x, y;

		var map = new Array(generatorState.size);
		for (y= 0; y < generatorState.size; y++) {
			map[y] = new Array(generatorState.size);
			for (x   = 0; x < generatorState.size; x++) {
				map[y][x] = null;
			}
		}

		while(tiles.length > 0) {
			var tile = tiles.pop();
			
			x = Math.round(generatorState.rng() * (generatorState.size - 1));
			y = Math.round(generatorState.rng() * (generatorState.size - 1));

			if(map[y][x]) {
				tiles.push(map[y][x]);
			}

			map[y][x] = tile;
		}

		generatorState.map = map;
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

	console.log(generatorState);

	return generatorState;
}