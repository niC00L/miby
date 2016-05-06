var print = function(msg) {
	console.log(msg); //TODO
}

function generateLevel(level) {

	var rngRange = function(generatorState) {
		return Math.round( generatorState.baseRange.from + (generatorState.rng() * (generatorState.baseRange.to - generatorState.baseRange.from)) );
	};

	var getGeneratorState = function(level) {
		var rng = new xor4096("miby"+level);
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
		}
	};

	var genBaseRange = function(generatorState) {
		generatorState.baseRange.from = 0;
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
		generatorState.targetOperations = 1 + Math.round(rngRange(generatorState) / 5);
	};

	var genTargetUsefulOperations = function(generatorState) {
		generatorState.targetUsefulOperations = Math.max(Math.round(rngRange(generatorState) / 5), generatorState.targetOperations);
	};

	var genTargetPossibilities = function(generatorState) {
		generatorState.targetPossibilities = Math.max(1, Math.min(10 / generatorState.level, generatorState.targetUsefulOperations));
	}

	var genAllowedOperations = function(generatorState) {
		var opr = null;
		var ops = null;
		if(generatorState.level <= 2) {
			opr = ["plu"];
			ops = ["++"];
		} else if(generatorState.level <= 7) {
			opr = ["plu", "min"];
			ops = ["++", "+-"];
		} else {
			opr = ["plu", "min", "tim", "div"];
			ops = ["++", "+-", "*/"];
		}
		generatorState.allowedOperators = opr;
		generatorState.allowedOperations = ops;
	}

	var genUsefulTiles = function(generatorState) {
		generatorState.usefulTiles = [];

		var perPossibility = Math.round(generatorState.targetUsefulOperations / generatorState.targetPossibilities);

		for(i = 0; i < generatorState.targetPossibilities; i++) {
			var j = 0;
			var possibilityUsefulTiles = [
			{number: generatorState.previousTarget},
			{number: generatorState.target}
			];

			while(generatorState.usefulTiles.length < generatorState.targetUsefulOperations && j <= perPossibility) {
				
				var splitOn = Math.round(generatorState.rng() * (possibilityUsefulTiles.length - 2));
				var tiles = splitToOperations(possibilityUsefulTiles[splitOn].number, possibilityUsefulTiles[splitOn + 1].number, generatorState);
				possibilityUsefulTiles.splice(splitOn+1, 0, tiles[0], tiles[1]);

				j++;
			}

			for(i = 1; i < possibilityUsefulTiles.length - 1; i++) {
				generatorState.usefulTiles.push(possibilityUsefulTiles[i]);
			}
		}
	}

	var genUselessTiles = function(generatorState) {

		var genRandomTile = function(generatorState) {
			return {
				number: rngRange(generatorState),
				operator: generatorState.allowedOperators[Math.round(generatorState.rng() * generatorState.allowedOperators.length - 1)]
			};
		}

		generatorState.uselessTiles = [];

		while(generatorState.usefulTiles.length + generatorState.uselessTiles.length < generatorState.targetOperations) {
			generatorState.uselessTiles.push(genRandomTile(generatorState));
		}
	};

	var genMap = function(generatorState) {
		var tiles = generatorState.usefulTiles.concat(generatorState.uselessTiles);

		var map = new Array(generatorState.size);
		for (var y= 0; y < generatorState.size; y++) {
			map[y] = new Array(generatorState.size);
			for (var x   = 0; x < generatorState.size; x++) {
				map[y][x] = null;
			}
		}

		while(tiles.length > 0) {
			var tile = tiles.pop();

			var x = Math.round(generatorState.rng() * (generatorState.size - 1));
			var y = Math.round(generatorState.rng() * (generatorState.size - 1));

			if(map[y][x]) {
				tiles.push(map[x][y]);
				map[y][x] = null;
			}

			map[y][x] = tile;
		}

		generatorState.map = map;
	}

	generatorState = getGeneratorState(level);

	genBaseRange(generatorState);
	genSize(generatorState);
	genTarget(generatorState);
	genTargetOperations(generatorState);
	genTargetUsefulOperations(generatorState);
	genTargetPossibilities(generatorState);
	genAllowedOperations(generatorState);
	genUsefulTiles(generatorState);
	genUselessTiles(generatorState);
	genMap(generatorState);

	return generatorState;
}

/* TODO
function printLevel(state) {
	for(y = 0; y < state.size; y++) {
		var line = " ";
		for(x = 0; x < state.size; x++) {
			if(state.level[y][x]) {
				console.log(state.level[y][x]);
				line = line + state.level[y][x].operator.charAt(0)+state.level[y][x].number + " ";
			} else {
				line = line + "n0 ";
			}
		}
		console.log(line);
	}
}
*/