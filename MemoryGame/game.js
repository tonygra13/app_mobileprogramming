// Array di simboli
const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Creazione della griglia
const gridContainer = document.querySelector('.grid-container');
const cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let score = 0;

// Aggiunta degli event listener alle caselle
gridContainer.addEventListener('click', function(event) {
  const clickedCard = event.target;
  if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('flipped')) {
    flipCard(clickedCard);
  }
});

// Funzione per creare la griglia
function createGrid() {
  const shuffledSymbols = shuffle(symbols.concat(symbols));
  shuffledSymbols.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    cards.push(card);
    gridContainer.appendChild(card);
  });
}

// Funzione per mescolare l'array di simboli
function shuffle(symbols) {
  // Implementazione dell'algoritmo di Fisher-Yates
  for (let i = symbols.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
  }
  return symbols;
}

// Funzione per gestire il clic sulla casella
function flipCard(card) {
  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;

  if (!firstCard) {
    firstCard = card;
  } else if (!secondCard) {
    secondCard = card;
    moves++;
    checkMatch();
  }
}

// Funzione per controllare se le due carte sono una coppia
function checkMatch() {
  const symbol1 = firstCard.dataset.symbol;
  const symbol2 = secondCard.dataset.symbol;

  if (symbol1 === symbol2) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    score++;
    resetCards();
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetCards();
    }, 1000);
  }
}

// Funzione per ripristinare le variabili di stato delle carte
function resetCards() {
  firstCard = null;
  secondCard = null;
}

// Funzione per controllare se tutte le coppie sono state trovate
function checkWin() {
  if (score === symbols.length) {
    alert(`Hai vinto in ${moves} mosse!`);
  }
}

// Funzione per inizializzare una nuova partita
function newGame() {
  gridContainer.innerHTML = '';
  cards.length = 0;
  firstCard = null;
  secondCard = null;
  moves = 0;
  score = 0;
  createGrid();
}

// Funzione per resettare la partita corrente
function resetGame() {
  cards.forEach(card => {
    card.classList.remove('flipped');
    card.classList.remove('matched');
    card.textContent = '';
  });
  firstCard = null;
  secondCard = null;
  moves = 0;
  score = 0;
}

// Aggiunta degli event listener ai pulsanti
const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener('click', newGame);

const resetGameButton = document.getElementById('reset-game');
resetGameButton.addEventListener('click', resetGame);

// Inizializzazione del gioco
createGrid();