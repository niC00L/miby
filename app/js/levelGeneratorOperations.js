var splitToOperations = function(from, to, generatorState) {
	
	var lcm = function(x, y) {
		if ((typeof x !== 'number') || (typeof y !== 'number')) 
			return false;
		return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
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

	var operation = generatorState.allowedOperations[Math.round(generatorState.rng() * generatorState.allowedOperations.length - 1)];
	
	switch (operation) {
		
		case "++":
		var n = Math.round(generatorState.rng() * (to - from));
		return [{
			number: n,
			operator: "plu"
		},{
			number: to - from - n,
			operator: "plu"
		}];

		case "+-":
		var n = Math.round(generatorState.rng() * (Math.abs(from) + Math.abs(to)));
		return [{
			number: n,
			operator: "plu"
		},{
			number: from + n - t,
			operator: "min"
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
			operator: "*"
		},{
			number: ftlcm / to,
			operator: "/"
		}];

		default:
		throw "Illegal operation!";
	}
}