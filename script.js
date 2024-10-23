const animals = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐯'];
let gameBoard = document.getElementById('gameBoard');
let cardArray = [...animals, ...animals]; // Duplicating the array to make pairs
let flippedCards = [];
let matchedCards = [];

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create the game board
function createBoard() {
    gameBoard.innerHTML = ''; // Clear the board
    cardArray = shuffle(cardArray); // Shuffle the cards
    cardArray.forEach((animal, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.animal = animal;
        card.innerHTML = `<span>${animal}</span>`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Handle card flip
function flipCard() {
    if (flippedCards.length === 2) return; // Prevent flipping more than two cards
    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000); // Check match after 1 second
    }
}

// Check if two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.animal === card2.dataset.animal) {
        matchedCards.push(card1, card2);
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        checkWin();
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
    }
    flippedCards = [];
}

// Check if the player has matched all cards
function checkWin() {
    if (matchedCards.length === cardArray.length) {
        setTimeout(() => {
            alert('Congratulations! You matched all the animals!');
        }, 500);
    }
}

// Restart the game
document.getElementById('restart').addEventListener('click', () => {
    matchedCards = [];
    flippedCards = [];
    createBoard();
});

// Initialize the game
createBoard();
