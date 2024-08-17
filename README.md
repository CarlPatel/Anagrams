# Anagrams Game

Welcome to the Anagrams Game! This game challenges players to form as many valid words as possible using a set of six letters within a 1-minute timer. The game is hosted on a static HTML website and uses JavaScript and CSS styling to create an interactive and engaging experience.

**[Play the game here!](https://carlpatel.github.io/Anagrams/)**

To download this game onto your iPhone, check out the [installation section](#ios-installation-guide) below.


## Features

- **6-Letter Anagram Puzzle:** Players are presented with a shuffled set of six letters and must rearrange them to form valid words.
- **Real-Time Validation:** The game checks the validity of submitted words against a pre-filtered list of words derived from the [Aspell dictionary](http://aspell.net/).
- **Dynamic Scoring System:** Points are awarded as the game is played based on the length of the word submitted.
- **Scrollable Word Results:** A scrollable box displays once the game is over showing all possible valid words that could have been made with the given letters.
- **Responsive Design:** The game is styled using CSS to provide a user-friendly interface on both desktop and mobile devices (in both light an dark modes for IOS/MacOS).


## How to Play

1. The game starts with a row of six shuffled letters.
2.	Click the letters to place them into the slots provided.
3.	Once you think you have formed a valid word, click the "Enter" button.
4. The game will check if the word is valid:
   - If valid, the word will be added to your score.
   - If invalid, it will clear the slots and you can try again.
5.	You have 1 minute to find as many valid words as possible.
6. When the timer runs out your final score will be displayed, along with the words you found and all the possible words that could have been made with that set of letters.
   - To reveal all the hidden words in the box simply click on it.



## iOS Installation Guide

### Option 1: Add Webpage to Home Screen
1. **Open Safari** on your iPhone.
2. **Go to the hosted website.**
   - https://carlpatel.github.io/Anagrams/
3. **Click the share button.**
   - It looks like a box with an arrow pointing up out of it.
4. **Click "Add to Home Screen" button**
5. **Click "Add" again** in the top right corner to confirm.

This will add a bookmark to the homescreen of your iPhone allowing you to play the game in full screen mode.


### Option 2: Install the Configuration Profile
1. **Open this page on your iPhone.**
   - Use Safari, as other browsers may not support the direct installation of `.mobileconfig` files.
2. **Download this `.mobileconfig` file.**
   - [DOWNLOAD HERE](https://github.com/CarlPatel/Anagrams/releases/download/v2.0/Anagram.mobileconfig).
3. **Tap on the "Allow" button** when prompted to confirm the download.
4. **Go to Settings on your iPhone.**
5. **Tap on "Profile Downloaded" at the top**
   - If that it is not at the top go to General &rarr; VPN & Device Management and click `Anagram Game`
6. **Tap "Install"** in the top right corner of the screen.
   - Enter your passcode if prompted.
7. **Tap "Install" again** to confirm.
8. **Tap "Done"** once the installation is complete.

This will download the configured profile along with a web clip on the homescreen of your iPhone allowing you to play the game in full screen mode.


## Uninstalling the Profile

1. **Open Settings** on your iPhone, go to General &rarr; VPN & Device Management and click `Anagram Game`
2. **Tap on the `Anagram Game` profile**
3. **Tap "Remove Profile"**
   - Enter your passcode if prompted.
4. **Tap "Remove" again** to confirm.
5. **Tap "Done"** once the deletion is complete.

This will uninstall the configuration profile along with the web clip on the homescreen of your iPhone.



## Technical Details

- **HTML/JavaScript/CSS:** The game is built using standard web technologies since it is hosted on a static webpage through GitHub Pages.
- **Word List Filtering:** A custom script was used to parse the [Aspell dictionary](res/aspell/README.md), filtering out special characters and retaining only valid words for gameplay. This can also be changed to use the [Merriam Webster dictionary](res/merriam_webster/README.md) in a similar fashion.
- **Timer and Score Mechanism:** The game includes a 1-minute timer and a scoring mechanism that dynamically updates as the player enters words.