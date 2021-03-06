var genUsefulOperation = function(from, lastOperation, generatorState) {
	
	var lcm = function(x, y) {
		if ((typeof x !== 'number') || (typeof y !== 'number')) 
			return false;
		return Math.abs((x * y) / gcd(x, y));
	};

	var gcd = function(x, y) {
		x = Math.abs(x);
		y = Math.abs(y);
		while(y) {
			var t = y;
			y = x % y;
			x = t;
		}
		return x;
	};

	if(!lastOperation) {

		var operator = generatorState.allowedOperators[Math.round(generatorState.rng() * (generatorState.allowedOperators.length - 1))];

		switch (operator) {

			case "plu":
			var n1 = generatorState.rng() * generatorState.baseRange.to;
			n1 = Math.round((n1 + generatorState.target) / 2);
			return {
				number: Math.abs(n1 - from),
				operator: "plu"
			};

			case "min":
			var n2 = generatorState.rng() * (from - generatorState.baseRange.from);
			n2 = Math.round((n2 + generatorState.target) / 2);
			return {
				number: Math.abs(n2 - from),
				operator: "min"
			};

			case "tim":
			var n3 = generatorState.rng() * generatorState.baseRange.to;
			n3 = (n3 + generatorState.target) / 2;

			//try another operator
			if(n3 === 0 || from === 0) {
				return genUsefulOperation(from, lastOperation, generatorState);
			}

			n3 = Math.round(n3 / from);
			return {
				number: n3,
				operator: "tim"
			};

			case "div":
			var n4 = generatorState.rng() * (from - generatorState.baseRange.from);
			n4 = (n4 + generatorState.target) / 2;
			
			//try another operator
			if(n4 === 0 || from === 0) {
				return genUsefulOperation(from, lastOperation, generatorState);
			}

			n4 = Math.round(n4 * from);
			return {
				number: n4,
				operator: "div"
			};
			
			default:
			throw "Illegal miby operation "+operation;
		}

	} else {
		var n = generatorState.target - from;
		return {
			number: Math.abs(n),
			operator: n >= 0 ? "plu" : "min"
		};
	}
};

var applyOperation = function(operation, value) {
	switch(operation.operator) {
		case "plu":
		return value + operation.number;
		case "min":
		return value - operation.number;
		case "tim":
		return value * operation.number;
		case "div":
		return Math.round(value / operation.number);
	}
};