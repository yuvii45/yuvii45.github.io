const phrases = [
    [
        { text: "Hi, I'm ", isBold: false },
        { text: "Yuvraj Parekh", isBold: true },
        { text: ".", isBold: false}
    ],
    [
        { text: "I'm an undergraduate student at ", isBold: false },
        { text: "IIT Bombay", isBold: true },
        { text: ".", isBold: false}
    ],
    [
        { text: "I'm an aspiring ", isBold: false },
        { text: "Software Developer", isBold: true },
        { text: ".", isBold: false}
    ]
];

let currentPhrase = 0;
let currentSegment = 0;
let currentChar = 0;
let isDeleting = false;
let typingSpeed = 80;
let erasingSpeed = 30;

function type() {
    const typingElement = document.getElementById("typing-text");
    let currentText = "";

    // Safety check
    if (!phrases[currentPhrase] || !phrases[currentPhrase][currentSegment]) {
        currentPhrase = 0;
        currentSegment = 0;
        currentChar = 0;
        isDeleting = false;
        setTimeout(type, typingSpeed);
        return;
    }

    // Build text up to current segment and character
    for (let i = 0; i < currentSegment; i++) {
        currentText += phrases[currentPhrase][i].isBold
            ? `<strong>${phrases[currentPhrase][i].text}</strong>`
            : phrases[currentPhrase][i].text;
    }

    const segmentText = phrases[currentPhrase][currentSegment].text.substring(0, currentChar);
    currentText += phrases[currentPhrase][currentSegment].isBold
        ? `<strong>${segmentText}</strong>`
        : segmentText;

    typingElement.innerHTML = currentText;

    if (!isDeleting) 
    {
        // Typing forward
        if (currentChar < phrases[currentPhrase][currentSegment].text.length) {
            currentChar++;
            setTimeout(type, typingSpeed);
        } else {
            // Move to next segment or pause before erasing
            if (currentSegment < phrases[currentPhrase].length - 1) {
                currentSegment++;
                currentChar = 0;
                setTimeout(type, typingSpeed);
            } else {
                // Pause before erasing whole phrase
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(type, typingSpeed);
                }, 2000);
            }
        }
    } 
    else 
    {
        // Erasing backward
        if (currentChar > 0) {
            currentChar--;
            setTimeout(type, erasingSpeed);
        } else {
            if (currentSegment > 0) {
                currentSegment--;
                currentChar = phrases[currentPhrase][currentSegment].text.length;
                setTimeout(type, erasingSpeed);
            } else {
                // Move to next phrase
                currentPhrase = (currentPhrase + 1) % phrases.length;
                currentSegment = 0;
                currentChar = 0;
                isDeleting = false;
                setTimeout(type, erasingSpeed);
            }
        }
    }
}

window.onload = type;

