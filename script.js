let numOfLetters = 6;
let score = 0;
let timer = 60;  // in seconds
let currentWord = [];
let randLetters = [];
let usedWords = new Set();
let validWords = new Set();
let timerInterval;
let messageTimeout;
let revealAnagrams = false;

fetch("res/aspell/valid_aspell_words.txt")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.text();
    })
    .then(text => {
        text.split('\n').forEach(word => {
            validWords.add(word.trim().toUpperCase());
        });
        console.log("Valid words loaded:", validWords.size);
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
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
    randLetters = getSemiRandLetters(numOfLetters);
    //randLetters = ['A', 'N', 'A', 'G', 'R', 'M'];
    console.log(findAllAnagrams());
    for (let i = 0; i < numOfLetters; i++) {
        let letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        letterDiv.innerText = randLetters[i];
        letterDiv.dataset.index = i;
        letterDiv.addEventListener('click', () => selectLetter(randLetters[i], i));
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
            gameOver();
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


function gameOver() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.querySelector('.score#final-score').innerText = `Score: ${score.toString().padStart(4, '0')}`;
    document.querySelector('.words#final-word-count').innerText = `Words: ${usedWords.size}`;

    document.querySelector('.scrollable-box').addEventListener('click', () => {
        revealAnagrams = !revealAnagrams;
        populateScrollableBox();
    });

    populateScrollableBox();
}


function populateScrollableBox() {
    let totalWordCount = 0;
    let totalScore = 0;

    const allAnagrams = findAllAnagrams();
    const scrollableBox = document.querySelector('.scrollable-box');
    scrollableBox.innerHTML = '';
    
    // Populate the box with the anagrams
    allAnagrams.forEach(word => {
        const anagramLine = document.createElement('div');
        anagramLine.classList.add('anagram-line');
        scrollableBox.appendChild(anagramLine);

        const anagramItem = document.createElement('div');
        anagramItem.classList.add('anagram-item');
        anagramItem.id = 'word';
        
        let wordScore = calculateScore(word);
        const scoreItem = document.createElement('div');
        scoreItem.classList.add('anagram-item');
        scoreItem.id = 'score';

        if (usedWords.has(word) || revealAnagrams) {
            if (usedWords.has(word)) {
                anagramItem.style.fontWeight = 'bold';
                scoreItem.style.fontWeight = 'bold';
            }
            anagramItem.textContent = word;
            scoreItem.textContent = wordScore;
        } else {
            anagramItem.textContent = '?'.repeat(word.length);
            scoreItem.textContent = '?'.repeat(wordScore.toString().length);
        }

        anagramLine.appendChild(anagramItem);
        anagramLine.appendChild(scoreItem);
        
        totalWordCount++;
        totalScore += wordScore;
    });


    
    const hLine = document.createElement('hr');
    hLine.classList.add('anagram-line-break');
    scrollableBox.appendChild(hLine);



    const totalWordCountLine = document.createElement('div');
    totalWordCountLine.classList.add('anagram-line');
    totalWordCountLine.id = 'totals';
    scrollableBox.appendChild(totalWordCountLine);

    const totalWordCountString = document.createElement('div');
    totalWordCountString.textContent = `Total Words: `;
    totalWordCountString.classList.add('anagram-item');
    totalWordCountString.id = 'word';
    totalWordCountLine.appendChild(totalWordCountString);

    const totalWordCountItem = document.createElement('div');
    totalWordCountItem.textContent = `${totalWordCount}`;
    totalWordCountItem.classList.add('anagram-item');
    totalWordCountItem.id = 'score';
    totalWordCountLine.appendChild(totalWordCountItem);



    const totalScoreLine = document.createElement('div');
    totalScoreLine.classList.add('anagram-line');
    totalScoreLine.id = 'totals';
    scrollableBox.appendChild(totalScoreLine);

    const totalScoreString = document.createElement('div');
    totalScoreString.textContent = `Total Score: `;
    totalScoreString.classList.add('anagram-item');
    totalScoreString.id = 'word';
    totalScoreLine.appendChild(totalScoreString);

    const totalScoreItem = document.createElement('div');
    totalScoreItem.textContent = `${totalScore}`;
    totalScoreItem.classList.add('anagram-item');
    totalScoreItem.id = 'score';
    totalScoreLine.appendChild(totalScoreItem);
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
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const randomLetters = [];

    // Ensure at least 2 vowels
    for (let i = 0; i < 2; i++) {
        const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
        randomLetters.push(randomVowel);
    }

    // Generate the remaining letters
    for (let i = 2; i < int; i++) {
        const randomIndex = Math.floor(Math.random() * 26);
        const randomLetter = String.fromCharCode(65 + randomIndex);
        randomLetters.push(randomLetter);
    }

    // Shuffle the array to mix vowels with other letters
    for (let i = randomLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomLetters[i], randomLetters[j]] = [randomLetters[j], randomLetters[i]];
    }

    return randomLetters;
}

function getSemiRandLetters(int) {
    const wordsArray = Array.from(validWords);
    const filteredWords = wordsArray.filter(word => word.length === int);
    const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    console.log(randomWord);

    const letters = randomWord.split('');
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    return letters;
}

function findAllAnagrams() {
    let result = [];

    // Recursive function to generate combinations
    function generateCombinations(subword, remainingLetters) {
        // If the subword is a valid word that hasn't been used and has at least 3 letters, add it to the result
        if (validWords.has(subword) && subword.length >= 3 && !result.includes(subword)) {
            result.push(subword);
        }

        // Recursive Call
        for (let i = 0; i < remainingLetters.length; i++) {
            generateCombinations(
                subword + remainingLetters[i],
                remainingLetters.slice(0, i).concat(remainingLetters.slice(i + 1))
            );
        }
    }

    generateCombinations("", randLetters);

    // Sort the result array
    result.sort((a, b) => {
        if (b.length !== a.length) {
            return b.length - a.length; // Sort by length (descending)
        }
        return a.localeCompare(b); // Sort alphabetically
    });

    return result;
}

