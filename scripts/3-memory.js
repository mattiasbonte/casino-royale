// ---------------
//! MUST
// 12 CARDS
// CLICK TURNS, MAX 2 AT SAME
//  - If match, stay visible,
//  - If no match, flip them back
// RANDOM POSITION CARDS IN GRID
// RESET BUTTON
//
//? NICE TO HAVE
// Playable by keyboard
// User define custom url images
// Multiplayer (local)
// ---------------

//? GAME VARIABLES EDITABLE
const cardAmount = 16;

// STARTING CARD NAMES
const cardNames = [
  'bar',
  'camera',
  'champagne',
  'chip',
  'cigar',
  'cocktail',
  'crown',
  'cues',
  'diamond',
  'dice',
  'gem',
  'gold',
  'grapes',
  'man',
  'police',
  'seven',
  'shoe',
  'slots',
  'strawberry',
  'vault',
  'woman',
];

// GENERATE RELATIVE PATHS TO CARDS IN ARRAY
const cards = [];
for (let i = 0; i < cardNames.length; i++) {
  const path = `../images/3-memory/${cardNames[i]}.svg`;
  cards.push(path);
}

// GENERATE RANDOM ARRAY WITH PAIRED CARDS ON PAGE LOAD
let shuffled = genRandCards();

// FLIP CARD
let lastCard = [];
let activeCards = [];

const allCards = document.querySelectorAll('.memoryCards');
allCards.forEach((thisCard) =>
  thisCard.addEventListener('click', () => {
    // Check if card is clicked on and if so, don't do anything, also if there is a match, cant click card either
    if (!activeCards.includes(thisCard.id)) {
      activeCards.push(thisCard.id);
      lastCard = flipCards(shuffled, thisCard, lastCard);
    }
  })
);

// RESET GAME
document.querySelector('#restart').onclick = () => {
  // Generate new random cards
  shuffled = genRandCards();
  // Reset ActiveCards
  activeCards = [];

  allCards.forEach((thisCard) => {
    // Reset images
    thisCard.src = '../images/3-memory/undercover.svg';
  });
};

// FUNCTIONS
function shuffler(input) {
  // FISHER-YATES SHUFFLER
  let currentIndex = input.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = input[currentIndex];
    input[currentIndex] = input[randomIndex];
    input[randomIndex] = temporaryValue;
  }
  return input;
}

function genRandCards() {
  // GENERATE RANDOM SELECTION OF CARD
  const chosenCards = [];
  while (chosenCards.length < cardAmount / 2) {
    const randNum = ~~(Math.random() * cards.length);
    if (!chosenCards.includes(randNum)) {
      chosenCards.push(randNum);
    }
  }

  // GENERATE 2 OF THE SAME CARDS IN THE ARRAY
  const doubleCards = chosenCards.concat(chosenCards);

  // SHUFFLE THE FINAL ARRAY
  const shuffled = shuffler(doubleCards);
  return shuffled;
}

function flipCards(shuffled, thisCard, lastCard) {
  // Value that will be returned
  let returnValue = [];
  // Get the ID from thisCard
  const thisId = Number(thisCard.id.slice(4)) - 1;

  // IF there was a lastCard, check if ID's match, if not, turn cards
  if (lastCard[1] === 'first card turned') {
    const lastId = Number(lastCard[0].id.slice(4)) - 1;

    if (shuffled[lastId] === shuffled[thisId]) {
      // Match
      thisCard.src = cards[shuffled[thisId]];
      returnValue = [thisCard, 'match'];
      return returnValue;
    } else {
      // Nomatch
      thisCard.src = cards[shuffled[thisId]];
      returnValue = [thisCard, 'nomatch'];
      setTimeout(() => {
        lastCard[0].src = '../images/3-memory/undercover.svg';
        thisCard.src = '../images/3-memory/undercover.svg';
        activeCards = activeCards.filter(
          (id) => id !== lastCard[0].id && id !== thisCard.id
        );
      }, 2000);
      return returnValue;
    }
  } else {
    // If there is no lastCard, turn the card
    thisCard.src = cards[shuffled[thisId]];
    returnValue = [thisCard, 'first card turned'];
    console.log('First card turned!');
    return returnValue;
  }
}
