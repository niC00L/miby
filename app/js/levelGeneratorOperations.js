var gnerateOperations = function(from, to, generatorState) {
	
	var genOperationNumbers = function(from, to, operation, generatorState) {
		switch (operation) {
			
			case "++":
			var n = int(generatorState.rng() * (to - from));
			return [{
				number: n,
				operator: "+"
			},{
				number: to - from - n,
				operator: "+"
			}];

			case "+-":
			var n = int(generatorState.rng() * (Math.abs(from) + Math.abs(to)));
			return [{
				number: n,
				operator: "+"
			},{
				number: from + n - t,
				operator: "-"
			}];

			case "**":
			n = int(generatorState.rng() * (to - from))
			return [{
				number: n,
				operator: "*"
			},{
				number: (to - from) - n,
				operator: "*"
			}];

			case "*/":
			n = int(generatorState.rng() * (to - from))
			return [{
				number: n,
				operator: "+"
			},{
				number: (to - from) - n,
				operator: "+"
			}];

			default:
			throw "Illegal operation!";
		}
	}
}