const MORSE_CODE = {
	".-": "a",
	"-...": "b",
	"-.-.": "c",
	"-..": "d",
	".": "e",
	"..-.": "f",
	"--.": "g",
	"....": "h",
	"..": "i",
	".---": "j",
	"-.-": "k",
	".-..": "l",
	"--": "m",
	"-.": "n",
	"---": "o",
	".--.": "p",
	"--.-": "q",
	".-.": "r",
	"...": "s",
	"-": "t",
	"..-": "u",
	"...-": "v",
	".--": "w",
	"-..-": "x",
	"-.--": "y",
	"--..": "z",
	".----": "1",
	"..---": "2",
	"...--": "3",
	"....-": "4",
	".....": "5",
	"-....": "6",
	"--...": "7",
	"---..": "8",
	"----.": "9",
	"-----": "0",
	"/": " ",
};

function convert() {
	const input = document.getElementById("input").value.toLowerCase();
	let output = "";
	for (let i = 0; i < input.length; i++) {
		if (input[i] === " ") {
			output += "/ ";
		} else {
			for (let morse in MORSE_CODE) {
				if (MORSE_CODE[morse] === input[i]) {
					output += morse + " ";
					break;
				}
			}
		}
	}
	document.getElementById("output").value = output.trim();
}

function decrypt() {
const input = document.getElementById("input").value;
let output = "";
const words = input.split("/");
for (let i = 0; i < words.length; i++) {
const letters = words[i].split(" ");
for (let j = 0; j < letters.length; j++) {
if (MORSE_CODE[letters[j]]) {
output += MORSE_CODE[letters[j]];
} else {
output += letters[j];
}
}
output += " ";
}
document.getElementById("output").value = output.trim();
}
