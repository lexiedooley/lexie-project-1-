const cards = document.querySelectorAll('div.card');


let firstCard;
let secondCard;
let timeCountdown;
let gameRunning = false;

// function to select card
const selectCard = (card) => {
// check if the card has been selected already
  if (card.classList.contains('selected')) {
 // if the card is selected, remove the class
    card.classList.remove('selected');
  }
  else {
 // if the card isn't selected, add the new class
    card.classList.add('selected');
  }
}
// function to see if cards match
const checkMatch = () => {
// check to see if the data in runes matches
  if (firstCard.dataset.runes === secondCard.dataset.runes) {
    firstCard.classList.add('test');
    secondCard.classList.add('test');
    firstCard = undefined;
    secondCard = undefined;
  }
//if not remove selected tag and move to undefined
  else {
    firstCard.classList.remove('selected');
    secondCard.classList.remove('selected');
    firstCard = undefined;
    secondCard = undefined;
  }
}

for (let i = 0; i < cards.length; i++) {
  cards[i].id = `card-${i}`;
  cards[i].addEventListener("click", () => {
    const card = document.getElementById(`card-${i}`);
//check to see if game is running
    if (!gameRunning)
    return;
// check whether or not we have a card selected yet
    if (firstCard === undefined && secondCard === undefined) {
      selectCard(card);
// assign the value of firstCard (originally undefined) to be the card that was clicked
      firstCard = card;
    }
// if we have 1 card selected and we do not select the same card as our second card
    else if (firstCard !== undefined && secondCard === undefined && firstCard !== card) {
// invoke the function select card passing in the SECOND card value
      selectCard(card);
// assign the value of secondCard to be the third div
      secondCard = card;
// invoke checkMatch
      checkMatch();
    }
  });
}

// countdown

// declare function and show duration/display
function startTimer(duration, display) {
// the timer duration should be in minutes/seconds
  let timer = duration, minutes, seconds;
  let intervalId = setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
// display as 00:00
      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(intervalId);
      }

  //restart
  document.getElementById('restart').addEventListener('click', function () {
        clearInterval(intervalId);
        startTimer(duration, display);
  })
  }, 1000);
}

window.onload = function () {
  let count = 60; 
// pull start button and what's inside the div
      display = document.querySelector('#time');
// when start button clicked, rerun start timer function
    document.getElementById('start').addEventListener('click', function () { 
      if (!gameRunning) {
        gameRunning = true;
        startTimer(count, display);
      }

    });    


};
