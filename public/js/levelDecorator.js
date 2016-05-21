var LevelDecorator = function(generatorState) {

	var map;
	var decorator;
	var tiles;

	var linearSymmetryAngle;

	this.initialize = function() {
		tiles = generatorState.usefulTiles.concat(generatorState.uselessTiles);

		map = new Array(generatorState.size);
		var x, y;
		for (y = 0; y < generatorState.size; y++) {
			map[y] = new Array(generatorState.size);
			for (x = 0; x < generatorState.size; x++) {
				map[y][x] = null;
			}
		}
		
		decorator = this.randomDecorator.bind(this);
	};

	this.decorateMap = function() {
		this.initialize();

		while(tiles.length > 0) {
			decorator();
		}

		return map;
	};

	this.changeDecorator = function() {
		switch(Math.round(generatorState.rng() * 3)) {
			case 0: // Random decorator
			decorator = this.randomDecorator.bind(this);
			break;
			case 1: // Center symmetryw
			decorator = this.centerSymmetryDecorator.bind(this);
			break;
			case 2: // Vertical symmetry
			linearSymmetryAngle = 0 * Math.PI
			decorator = this.linearSymmetryDecorator.bind(this);
			break;
			case 3: // Horizontal symmetry
			linearSymmetryAngle = 90 * Math.PI
			decorator = this.linearSymmetryDecorator.bind(this);
			break;
		}
	};

	this.randomDecorator = function() {
		var tile = tiles.pop();

		x = Math.round(generatorState.rng() * (generatorState.size - 1));
		y = Math.round(generatorState.rng() * (generatorState.size - 1));

		if(map[y][x]) {
			tiles.push(map[y][x]);
		}

		map[y][x] = tile;

		//if(generatorState.rng() * 5 > 4) {
			this.changeDecorator();
		//}
	}

	this.centerSymmetryDecorator = function() {
		var tile = tiles.pop();

		var centerSymmetryCoord = function(x, y) {
			return {
				x: generatorState.size - x - 1,
				y: generatorState.size - y - 1
			}
		}

		var x, y;
		for (y = 0; y < generatorState.size; y++) {
			for (x = 0; x < generatorState.size; x++) {
				if(map[y][x]) {
					coords = centerSymmetryCoord(x, y);
					if(!map[coords.y][coords.x]){
						map[coords.y][coords.x] = tile;
						return;
					} 
				}
			}
		}

		//no symmetry found
		tiles.push(tile);
		this.changeDecorator();
	};

	this.linearSymmetryDecorator = function() {
		var tile = tiles.pop();

		console.log("linearSymmetryCoord");

		var linearSymmetryCoord = function(x, y) {
			var s2 = (generatorState.size-1) / 2;
			return {
				x: Math.round(((x-s2)*Math.cos(linearSymmetryAngle))+((y-s2)*-1*Math.sin(linearSymmetryAngle))) + s2,
				y: Math.round(((x-s2)*-1*Math.sin(linearSymmetryAngle))+((y-s2)*-1*Math.cos(linearSymmetryAngle))) + s2
			}
		}

		var x, y;
		for (y = 0; y < generatorState.size; y++) {
			for (x = 0; x < generatorState.size; x++) {
				if(map[y][x]) {
					coords = linearSymmetryCoord(x, y);
					console.log({x:x, y:y},coords);
					if(!map[coords.y][coords.x]){
						map[coords.y][coords.x] = tile;
						return;
					} 
				}
			}
		}
		//no symmetry found
		tiles.push(tile);
		this.changeDecorator();
	};

	return this;
}