function encrypt() {
    const input = document.getElementById("input-text").value;
    const output = document.getElementById("output-text");
    const charMap = {
        "A": "%",
        "B": "L",
        "C": "3",
        "D": "9",
        "E": "8",
        "F": "2",
        "G": "1",
         "H": "6",
        "I": "4",
        "J": "7",
        "K": "5",
        "L": "0",
        "M": "@",
        "N": "#",
        "O": "o",
        "P": "^",
        "Q": "&",
        "R": "$",
        "S": ")",
        "T": "(",
        "U": "+",
        "V": "-",
        "W": "_",
        "X": "=",
        "Y": "{",
        "Z": "}"
    };
    let result = "";
    for (let i = 0; i < input.length; i++) {
        if (charMap[input[i].toUpperCase()]) {
            result += charMap[input[i].toUpperCase()];
        } else {
            result += input[i];
        }
    }
    output.value = result;
    document.getElementById("input-text").value = "";
}

function decrypt() {
    const input = document.getElementById("output-text").value;
    const output = document.getElementById("input-text");
    const charMap = {
        "%": "A",
        "L": "B",
        "3": "C",
        "9": "D",
        "8": "E",
        "2": "F",
        "1": "G",
        "6": "H",
        "4": "I",
        "7": "J",
        "5": "K",
        "0": "L",
        "@": "M",
        "#": "N",
        "o": "O",
        "^": "P",
        "&": "Q",
        "$": "R",
        ")": "S",
			"(": "T",
			"+": "U",
			"-": "V",
			"_": "W",
			"=": "X",
			"{": "Y",
			"}": "Z"
		};
		let result = "";
		for (let i = 0; i < input.length; i++) {
			if (charMap[input[i]]) {
				result += charMap[input[i]];
			} else {
				result += input[i];
			}
		}
		output.value = result;
		document.getElementById("output-text").value = "";
	}function encrypt() {
        const input = document.getElementById("input-text").value;
        const output = document.getElementById("output-text");
        const charMap = {
            "A": "%",
            "B": "L",
            "C": "3",
            "D": "9",
            "E": "8",
            "F": "2",
            "G": "1",
            "H": "6",
            "I": "4",
            "J": "7",
            "K": "5",
            "L": "0",
            "M": "@",
            "N": "#",
            "O": "*",
            "P": "^",
            "Q": "&",
            "R": "$",
            "S": ")",
            "T": "(",
            "U": "+",
            "V": "-",
            "W": "_",
            "X": "=",
            "Y": "{",
            "Z": "}",
            "a": "%",
            "b": "L",
            "c": "3",
            "d": "9",
            "e": "8",
            "f": "2",
            "g": "1",
            "h": "6",
            "i": "4",
            "j": "7",
            "k": "5",
            "l": "0",
            "m": "@",
            "n": "#",
            "o": "*",
            "p": "^",
            "q": "&",
            "r": "$",
            "s": ")",
            "t": "(",
            "u": "+",
            "v": "-",
            "w": "_",
            "x": "=",
            "y": "{",
            "z": "}"
        };
        let result = "";
        for (let i = 0; i < input.length; i++) {
            if (charMap[input[i]]) {
                result += charMap[input[i]];
            } else {
                result += input[i];
            }
        }
        output.value = result;
        }
        
        function decrypt() {
        const input = document.getElementById("output-text").value;
        const output = document.getElementById("input-text");
        const charMap = {
        "%": "A",
        "L": "B",
        "3": "C",
        "9": "D",
        "8": "E",
        "2": "F",
        "1": "G",
        "6": "H",
        "4": "I",
        "7": "J",
        "5": "K",
        "0": "L",
        "@": "M",
        "#": "N",
        "*": "O",
        "^": "P",
        "&": "Q",
        "$": "R",
        ")": "S",
        "(": "T",
        "+": "U",
        "-": "V",
        "_": "W",
        "=": "X",
        "{": "Y",
        "}": "Z"
        };
        let result = "";
        for (let i = 0; i < input.length; i++) {
        if (charMap[input[i]]) {
        result += charMap[input[i]];
        } else {
        result += input[i];
        }
        }
        output.value = result;
        }
    