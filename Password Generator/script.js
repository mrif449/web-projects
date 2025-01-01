const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".copy-btn"); // Select the button
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");
const copyFeedback = document.querySelector(".copy-feedback");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        includeLowercase = false,
        includeUppercase = false,
        includeNumbers = false,
        includeSymbols = false,
        includeSpaces = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id === "lowercase") {
                includeLowercase = true;
            } else if (option.id === "uppercase") {
                includeUppercase = true;
            } else if (option.id === "numbers") {
                includeNumbers = true;
            } else if (option.id === "symbols") {
                includeSymbols = true;
            } else if (option.id === "spaces") {
                includeSpaces = true;
            }
        }
    });

    if (includeLowercase) staticPassword += characters.lowercase;
    if (includeUppercase) staticPassword += characters.uppercase;
    if (includeNumbers) staticPassword += characters.numbers;
    if (includeSymbols) staticPassword += characters.symbols;
    if (includeSpaces) staticPassword += " ";

    if (!(includeLowercase && includeUppercase && includeNumbers && includeSymbols && includeSpaces)) {
        randomPassword += includeLowercase ? characters.lowercase[Math.floor(Math.random() * characters.lowercase.length)] : '';
        randomPassword += includeUppercase ? characters.uppercase[Math.floor(Math.random() * characters.uppercase.length)] : '';
        randomPassword += includeNumbers ? characters.numbers[Math.floor(Math.random() * characters.numbers.length)] : '';
        randomPassword += includeSymbols ? characters.symbols[Math.floor(Math.random() * characters.symbols.length)] : '';
        randomPassword += includeSpaces ? ' ' : '';
    }

    for (let i = randomPassword.length; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        randomPassword += randomChar;
    }

    passwordInput.value = randomPassword;
    updatePassIndicator();
}

const updatePassIndicator = () => {
    let strength = 0;

    // Check for lowercase, uppercase, numbers, symbols, and spaces
    const includesLowercase = options[0].checked;
    const includesUppercase = options[1].checked;
    const includesNumbers = options[2].checked;
    const includesSymbols = options[3].checked;
    const includesSpaces = options[5].checked;

    // Add strength for each included character type
    strength += includesLowercase ? 1 : 0;
    strength += includesUppercase ? 1 : 0;
    strength += includesNumbers ? 1 : 0;
    strength += includesSymbols ? 1 : 0;
    strength += includesSpaces ? 1 : 0;

    // Add strength based on password length
    const passLength = parseInt(lengthSlider.value);
    strength += passLength >= 12 ? 1 : 0;
    strength += passLength >= 16 ? 1 : 0;

    // Update passIndicator based on strength
    if (strength <= 2) {
        passIndicator.id = "weak";
    } else if (strength <= 4) {
        passIndicator.id = "medium";
    } else {
        passIndicator.id = "strong";
    }
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    // Ensure password input has value
    if (passwordInput.value) {
        navigator.clipboard.writeText(passwordInput.value)
            .then(() => {
                copyFeedback.classList.add("show"); // Show feedback
                setTimeout(() => {
                    copyFeedback.classList.remove("show"); // Hide feedback
                }, 1500);
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    } else {
        alert("Nothing to copy! Generate a password first.");
    }
};

const passwordLengthSlider = document.getElementById('length-slider');
const passwordLengthValue = document.querySelector('.length-value');

function updatePasswordLengthValue() {
    passwordLengthValue.textContent = passwordLengthSlider.value;
}

function decreasePasswordLength() {
    if (parseInt(passwordLengthSlider.value) > parseInt(passwordLengthSlider.min)) {
        passwordLengthSlider.value = parseInt(passwordLengthSlider.value) - 1;
        updatePasswordLengthValue();
    }
}

function increasePasswordLength() {
    if (parseInt(passwordLengthSlider.value) < parseInt(passwordLengthSlider.max)) {
        passwordLengthSlider.value = parseInt(passwordLengthSlider.value) + 1;
        updatePasswordLengthValue();
    }
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
generateBtn.addEventListener("click", generatePassword);