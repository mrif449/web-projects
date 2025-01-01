const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const textToHexButton = document.getElementById("text-to-hex");
const hexToTextButton = document.getElementById("hex-to-text");

textToHexButton.addEventListener("click", function() {
	const text = inputText.value;
	const hex = textToHex(text);
	outputText.value = hex;
});

hexToTextButton.addEventListener("click", function() {
	const hex = inputText.value;
	const text = hexToText(hex);
	outputText.value = text;
});

function textToHex(text) {
	let hex = "";
	for (let i = 0; i < text.length; i++) {
		hex += text.charCodeAt(i).toString(16);
	}
	return hex;
}

function hexToText(hex) {
	let text = "";
	for (let i = 0; i < hex.length; i += 2) {
		text += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return text;
}
