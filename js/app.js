/*
 * Create a list that holds all of your cards
 */

 let cardDeck = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
                  'fa-leaf', 'fa-bicycle', 'fa-bomb',]
 cardDeck = cardDeck.concat(cardDeck);
 let openCard = [];
 let moves = 0;
 let matchedCards = 0;
 let starCount = 3;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

function deal() {
  let newCardDeck = shuffle(cardDeck);
  newCardDeck.forEach(function(c) {
    let list = document.createElement('li');
    list.classList.add('card');
    let item = document.createElement('i');
    item.classList.add('fa', c);
    list.appendChild(item);
    document.querySelector('.deck').appendChild(list);
  })
};

deal();

// Add event listener to cards
let cards = document.getElementsByClassName('card');
for (var i = 0 ; i < cards.length ; i++) {
  cards[i].addEventListener('click', showCard)
};

// Show cards on click and check if they match
function showCard() {
  this.removeEventListener('click', showCard);
  this.classList.add('show', 'open');
  openCard.push(this);
  if (openCard.length === 2) {
    updateCounter();
    if (openCard[0].firstChild.classList.value === openCard[1].firstChild.classList.value) {
      openCard[0].classList.add('match');
      openCard[1].classList.add('match');
      matchedCards++;
      clearOpenCard();
      openModal();
    } else {
      setTimeout(hideCard, 500);
      setTimeout(clearOpenCard, 500);
    }
  }
};

// Hide cards if they do not match
function hideCard() {
  openCard[0].classList.remove('show', 'open');
  openCard[1].classList.remove('show', 'open');
  let cards = document.getElementsByClassName('card');
  for (var i = 0 ; i < cards.length ; i++) {
    cards[i].addEventListener('click', showCard);
  }
};

// Remove cards from openCard if no match
function clearOpenCard() {
  openCard = [];
};

// Updates move counter and skill level
function updateCounter() {
  moves++;
  let displayMoves = document.getElementById('moves');
  displayMoves.innerHTML = moves;
  let stars = document.getElementsByClassName('fa-star');
  if (moves > 10) {
    stars[0].classList.add('hide');
    starCount = 2;
    if (moves > 18) {
      stars[1].classList.add('hide');
      starCount = 1;
    }
  }
};

// Restart Game
let restart = document.getElementById('restart');
restart.addEventListener('click', restartGame);
function restartGame() {
  location.reload();
};


// Timer function from https://codingwithsara.com/
let clickDeck = document.getElementsByClassName('deck')[0]
clickDeck.addEventListener('click', start);

let status = 0;
let time = 0;

function start() {
  status = 1;
  timer();
  clickDeck.removeEventListener('click', start);
};


function stop() {
  status = 0;
};

function timer() {
  if(status == 1) {
    setTimeout(function() {
      time++;
      let min = Math.floor(time/100/60);
      let sec = Math.floor(time/100);
      let mSec = time % 100;

      if(min < 10) {
        min = '0' + min;
      }
      if(sec >= 60) {
        sec = sec % 60;
      }
      if(sec < 10) {
        sec = '0' + sec;
      }

      document.getElementById('timer').innerHTML = min + ':' + sec + ':' + mSec;
      timer();
    }, 10)
  }
};

// Open modal on Win
let modal = document.getElementById('winning-modal');
let fullTime = document.getElementById('timer').innerHTML
let displayStats = document.getElementsByClassName('winning-stats')[0];
function openModal() {
  if (matchedCards === 8) {
    // stops Timer
    stop();
    modal.style.display = 'block';
    //  get time
    let finalTime = document.getElementById('timer').innerHTML;
    // Display stats
    displayStats.innerHTML = `in ${finalTime} with a total of ${starCount} stars in ${moves} moves`
  }
};

// Close Modal
let closeBtn = document.getElementsByClassName('close-btn')[0];
closeBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
};

// Close Modal  if outside clicked
window.addEventListener('click', clickOutside)
function clickOutside(e) {
  if(e.target == modal) {
    modal.style.display= 'none';
  }
};

// Play Again
let playAgainBtn = document.getElementById('play-again-btn');
playAgainBtn.addEventListener('click', restartGame);
