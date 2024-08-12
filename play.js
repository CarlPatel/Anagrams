let numOfLetters = 6;
let score = 0;
let time = 10;  // in seconds
let currentWord = [];
let usedWords = new Set();
let validWords = new Set();
const timerDiv = document.getElementById('timer');
const wordsDiv = document.getElementById('words');
const scoreDiv = document.getElementById('score');
let timerInterval;



// Fetch valid words before starting the game
fetch("valid_words.txt")
    .then(response => response.text())
    .then(text => {
        text.split('\n')
        .forEach(word => {
            validWords.add(word.trim().toUpperCase())
        })
    });

// Display the random letters and add event listeners
const lettersDiv = document.querySelector('.letters');
//const Randletters = getRandLetters(numOfLetters);
const Randletters = ['A', 'N', 'A', 'G', 'R', 'M'];
Randletters.forEach((letter, index) => {
    let letterDiv = document.createElement('div');
    letterDiv.classList.add('letter');
    letterDiv.innerText = letter;
    letterDiv.dataset.index = index;
    letterDiv.addEventListener('click', () => selectLetter(letter, index));
    lettersDiv.appendChild(letterDiv);
});

// Display the slots and add event listeners
const slotsDiv = document.querySelector('.slots');
for (let i = 0; i < numOfLetters; i++) {
    let slotDiv = document.createElement('div');
    slotDiv.classList.add('slot');
    slotDiv.dataset.slotIndex = i;
    slotDiv.addEventListener('click', () => deselectLetter(i));
    slotsDiv.appendChild(slotDiv);
}

// Create Enter Button and Functionality
document.getElementById('submitButton').addEventListener('click', () => {
    const word = currentWord.map(item => item.letter).join('').toUpperCase();
    if (word.length < 3) {
        alert('Word must be at least 3 letters long!');
        return;
    }
    if (!usedWords.has(word)) {
        if (validWords.has(word)) {
            usedWords.add(word);
            updateWordsDisplay();
            const wordScore = calculateScore(word);
            score += wordScore;
            updateScoreDisplay();
            alert(`${word}: +${wordScore}`);
        } else {
            alert('Not a valid word!');
        }
    } else {
        alert('This word has already been used!');
    }
    resetSlots();
});


// Start the timer
function startTimer() {
    timer = time;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timer--;
        updateTimerDisplay();
        if (timer === 0) {
            clearInterval(timerInterval);
            //alert(`Time's up! Your score is ${score}`);
            window.location.href = `results.html?score=${score}`;
        }
    }, 1000);
}

// Update the timer display in minutes:seconds format (00:00)
function updateTimerDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDiv.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update the words display
function updateWordsDisplay() {
    wordsDiv.innerText = `Words: ${usedWords.size}`;
}

// Update the score display to have 4 digits
function updateScoreDisplay() {
    scoreDiv.innerText = `Score: ${score.toString().padStart(4, '0')}`;
}



// Start Game
startTimer();
updateWordsDisplay();
updateScoreDisplay();





// Select a letter and push it to the next available slot
function selectLetter(letter, index) {
    if (currentWord.length < numOfLetters) {
        currentWord.push({ letter, index });
        document.querySelectorAll('.letter')[index].style.visibility = 'hidden';
        updateSlots();
    }
}

// Deselect a letter and put it back in the letters row
function deselectLetter(slotIndex) {
    if (currentWord[slotIndex]) {
        const index = currentWord[slotIndex].index;
        currentWord.splice(slotIndex, 1);
        document.querySelectorAll('.letter')[index].style.visibility = 'visible';
        updateSlots();
    }
}

// Update the slots with the current word
function updateSlots() {
    document.querySelectorAll('.slot').forEach((slot, index) => {
        slot.innerText = currentWord[index] ? currentWord[index].letter : '';
    });
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
    document.querySelectorAll('.slot').forEach(slot => slot.innerText = '');
    document.querySelectorAll('.letter').forEach(letter => letter.style.visibility = 'visible');
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