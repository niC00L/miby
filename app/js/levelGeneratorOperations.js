var splitToOperations = function(from, to, generatorState) {
	
	var lcm = function(x, y) {
		if ((typeof x !== 'number') || (typeof y !== 'number')) 
			return false;
		return (!x || !y) ? 0 : Math.abs((x * y) / gcd(x, y));
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

	var operation = generatorState.allowedOperations[Math.round(generatorState.rng() * (generatorState.allowedOperations.length - 1))];

	switch (operation) {
		
		case "++":
		var n1 = Math.round(generatorState.rng() * (to - from));
		return [{
			number: Math.abs(n1),
			operator: n1 >= 0 ? "plu" : "min"
		},{
			number: Math.abs(to - from - n1),
			operator: (to - from - n1) >= 0 ? "plu" : "min"
		}];

		case "+-":
		var n2 = Math.round(generatorState.rng() * (Math.abs(from) + Math.abs(to)));
		return [{
			number: Math.abs(n2),
			operator: n2 >= 0 ? "plu" : "min"
		},{
			number: Math.abs(from - n2 + to),
			operator: (from - n2 + to) >= 0 ? "plu" : "min"
		}];

		/*
		case "**":
		return [{
			number: ,
			operator: "*"
		},{
			number: ,
			operator: "*"
		}];
		*/

		case "*/":
		var ftlcm = lcm(from, to);
		return [{
			number: ftlcm / from,
			operator: "tim"
		},{
			number: ftlcm / to,
			operator: "div"
		}];

		default:
		throw "Illegal miby operation "+operation+"!";
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
}