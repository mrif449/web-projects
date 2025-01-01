function convertToBinary() {
	const inputText = document.getElementById('input-text').value;
	const binaryOutput = document.getElementById('output-binary');
	
	let binaryString = '';
	
	for(let i = 0; i < inputText.length; i++) {
		const binary = inputText[i].charCodeAt(0).toString(2);
		binaryString += binary.padStart(8, '0') + ' ';
	}
	
	binaryOutput.value = binaryString.trim();
}

function convertToText() {
	const inputBinary = document.getElementById('input-binary').value;
	const textOutput = document.getElementById('output-text');
	
	let textString = '';
	
	const binaryArray = inputBinary.trim().split(' ');
	
	for(let i = 0; i < binaryArray.length; i++) {
		const binary = binaryArray[i];
		const decimal = parseInt(binary, 2);
		const character = String.fromCharCode(decimal);
		textString += character;
	}
	
	textOutput.value = textString;
}

function copyToClipboard(id) {
    let textarea = document.getElementById(id);
    navigator.clipboard.writeText(textarea.value)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch((error) => {
            console.error('Could not copy text: ', error);
        });
}

