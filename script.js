let numOfLetters = 6;
let score = 0;
let timer = 100;  // in seconds
let currentWord = [];
let usedWords = new Set();
let validWords = new Set();
const wordsDiv = document.getElementById('words');
const scoreDiv = document.getElementById('score');
let timerInterval;
let messageTimeout;

// Fetch valid words before starting the game
fetch("valid_words.txt")
    .then(response => response.text())
    .then(text => {
        text.split('\n').forEach(word => {
            validWords.add(word.trim().toUpperCase());
        });
    });
    
initHowToPlay();




// How to play 
function initHowToPlay() {
    document.getElementById('start-container').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';

    document.getElementById('start-button').addEventListener('click', () => {
        document.getElementById('start-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        startGame();
    });
}


// Start Game
function startGame() {
    console.log("Starting Game");
    initGame();
    startTimer();
    updateWordsDisplay();
    updateScoreDisplay();
    updateSlots();
}

// Initialize the game
function initGame() {
    // Display the random letters and add event listeners
    const lettersDiv = document.querySelector('.letters#game-letters');
    const Randletters = getRandLetters(numOfLetters);
    //const Randletters = ['A', 'N', 'A', 'G', 'R', 'M'];
    for (let i = 0; i < numOfLetters; i++) {
        let letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        letterDiv.innerText = Randletters[i];
        letterDiv.dataset.index = i;
        letterDiv.addEventListener('click', () => selectLetter(Randletters[i], i));
        lettersDiv.appendChild(letterDiv);
    };

    // Display the slots and add event listeners
    const slotsDiv = document.querySelector('.slots');
    for (let i = 0; i < numOfLetters; i++) {
        let slotDiv = document.createElement('div');
        slotDiv.classList.add('slot');
        slotDiv.dataset.index = i;
        slotDiv.addEventListener('click', () => deselectLetter(i));
        slotsDiv.appendChild(slotDiv);
    }

    // Create Enter Button and Functionality
    document.getElementById('submit-button').addEventListener('click', () => {
        const word = currentWord.map(item => item.letter).join('').toUpperCase();
        if (!usedWords.has(word)) {
            if (validWords.has(word)) {
                usedWords.add(word);
                updateWordsDisplay();
                const wordScore = calculateScore(word);
                score += wordScore;
                updateScoreDisplay();
                updateMessage(`+${wordScore}`, 'green');
            } else {
                updateMessage('Not in the vocabulary', 'red');
            }
        } else {
            updateMessage('Already used', 'red');
        }
        resetSlots();
    });
}

// Start the timer
function startTimer() {
    updateTimerDisplay(timer);
    timerInterval = setInterval(() => {
        timer--;
        updateTimerDisplay(timer);
        if (timer === 0) {
            clearInterval(timerInterval);
            document.getElementById('game-container').style.display = 'none';
            document.getElementById('result-container').style.display = 'block';
            document.querySelector('.score#final-score').innerText = `Score: ${score.toString().padStart(4, '0')}`;
        }
    }, 1000);
}

// Update the timer display in minutes:seconds format (00:00)
function updateTimerDisplay(timer) {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.querySelector('.timer').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update the words display
function updateWordsDisplay() {
    document.querySelector('.words').innerText = `Words: ${usedWords.size}`;
}

// Update the score display to have 4 digits
function updateScoreDisplay() {
    document.querySelector('.score').innerText = `Score: ${score.toString().padStart(4, '0')}`;
}





// Select a letter and push it to the next available slot
function selectLetter(letter, index) {
    if (currentWord.length < numOfLetters) {
        currentWord.push({ letter, index });
        document.querySelectorAll('div.letters#game-letters .letter')[index].classList.add('hidden');
        updateSlots();
    }
}

// Deselect a letter and put it back in the letters row
function deselectLetter(slotIndex) {
    if (currentWord[slotIndex]) {
        const index = currentWord[slotIndex].index;
        currentWord.splice(slotIndex, 1);
        document.querySelectorAll('div.letters#game-letters .letter')[index].classList.remove('hidden');
        updateSlots();
    }
}

// Update the slots with the current word
function updateSlots() {
    document.querySelectorAll('.slot').forEach((slot, index) => {
        if (currentWord[index]) {
            slot.innerText = currentWord[index].letter;
            slot.classList.add('filled');
        } else {
            slot.innerText = '';
            slot.classList.remove('filled');
        }
    });
    if (currentWord.length >= 3) {
        document.getElementById('submit-button').disabled = false;
    } else {
        document.getElementById('submit-button').disabled = true;
    };
}



function updateMessage(message, color = 'black') {
    const messageDiv = document.querySelector('.message');

    // If there's an existing timeout, clear it
    if (messageTimeout) {
        clearTimeout(messageTimeout);
        messageDiv.classList.remove('show');
    }

    // Set the new message and start the fade-in process
    const word = currentWord.map(item => item.letter).join('').toUpperCase();
    messageDiv.innerText = `${word} (${message})`;
    messageDiv.style.color = color;
    messageDiv.classList.add('show');

    // Schedule the fade-out process
    messageTimeout = setTimeout(() => {
        messageDiv.classList.remove('show');
        // Clear the text after the fade-out completes
        messageTimeout = setTimeout(() => {
            messageDiv.innerText = '';
        }, 500); // Match this duration to your CSS transition time (0.5s)
    }, 1000);
}


// Calculate the score based on the word length
function calculateScore(word) {
    switch (word.length) {
        case 3:
            return 100;
        case 4:
            return 400;
        case 5:
            return 1200;
        case 6:
            return 2000;
        default:
            return word.length * 500;
    }
}

// Reset the slots without shuffling the letters
function resetSlots() {
    currentWord = [];
    updateSlots();
    document.querySelectorAll('div.letters#game-letters .letter').forEach(letter => letter.classList.remove('hidden'));
}

// Generate an array of random letters
function getRandLetters(int) {
    const randomLetters = [];
    for (let i = 0; i < int; i++) {
        const randomIndex = Math.floor(Math.random() * 26);
        const randomLetter = String.fromCharCode(65 + randomIndex);
        randomLetters.push(randomLetter);
    }
    return randomLetters;
}