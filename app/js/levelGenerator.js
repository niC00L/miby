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
 			level: null
 		}
 	};


 	var genBaseRange = function(generatorState) {
 		generatorState.baseRange.from = 0;
 		generatorState.baseRange.to = (generatorState.level*generatorState.level)/4+(generatorState.level/2)+10;
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
 		generatorState.targetOperations = int(rngRange(generatorState) / 5);
 	};

 	var genTargetUsefulOperations = function(generatorState) {
 		generatorState.targetUsefulOperations = Math.min(int(rngRange(generatorState) / 5), generatorState.targetOperations);
 	};

 	var genAllowedOperations = function(generatorState) {
 		var opr = null;
 		var ops = null;
 		if(generatorState.level <= 2) {
 			opr = ["+"];
 			ops = ["++"];
 		} else if(generatorState.level <= 5) {
 			opr = ["+", "-"];
 			ops = ["++", "+-"];
 		} else if(generatorState.level <= 11) {
 			opr = ["+", "-", "*"];
 			ops = ["++", "+-", "**"];
 		} else {
 			opr = ["+", "-", "*", "/"];
 			ops = ["++", "+-", "**", "*/"];
 		}
 		generatorState.allowedOperators = opr;
 		generatorState.allowedOperations = ops;
 	}

 	var genUsefulTiles = function(generatorState) {
 		var pt = generatorState.previousTarget;
 		var t = generatorState.target;

 		var generatorState.usefulTiles = [];
 		for (var i = 0; i < generatorState.targetUsefulOperations; i++) {

 		}
 	}

 	var genUselessTiles = function(generatorState) {

 		var genRandomTile = function(generatorState) {
 			return {
 				number: rngRange(generatorState),
 				operator: generatorState.allowedOperations[int(generatorState.rng() * generatorState.allowedOperations.length - 1)]
 			};
 		}

 		generatorState.uselessTiles = [];

 		while(generatorState.usefulTiles.length + generatorState.uselessTiles.length < ) {
 			generatorState.uselessTiles.push(genRandomTile(generatorState));
 		}
 	};

 	var genLevel = function(generatorState) {
 		var tiles = generatorState.usefulTiles.concat(generatorState.uselessTiles);

 		var level = new Array(generatorState.size);
 		for (var i = 0; i < generatorState.size; i++) {
 			level[i] = new Array(generatorState.size);
 		}

 		while(tiles.length > 0) {
 			var tile = tiles.pop();

 			var x = int(generatorState.rng() * generatorState.size);
 			var y = int(generatorState.rng() * generatorState.size);

 			if(level[x][y]) {
 				tiles.push(level[x][y]);
 				level[x][y] = null;
 			}

 			level[x][y] = tile;
 		}

 		generatorState.level = level;
 	}

 	generatorState = getGeneratorState(level);
 	
 	genBaseRange(generatorState);
 	genSize(generatorState);
 	genTarget(generatorState);
 	genTargetOperations(generatorState);
 	genTargetUsefulOperations(generatorState);
 	genAllowedOperations(generatorState);
 	genUsefulTiles(generatorState);
 	genUselessTiles(generatorState);
 	genLevel(generatorState);

 	return generatorState;
 }