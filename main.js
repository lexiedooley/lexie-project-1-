  /*----- constants -----*/
const cards = document.querySelectorAll('.card-container')

let flippedCard = false;
let cardOne, cardTwo;
let endGame = false;
let restart
  /*----- state variables -----*/


  /*----- cached elements  -----*/


  /*----- event listeners -----*/

// for each card, listen for a click, if click happens run flippingCard
cards.forEach(card => card.addEventListener('click', flippingCard));


  /*----- functions -----*/

// if card has been selected > check to see if the game is over > check to see if user is selecting cardOne. 
//if both returned, flip the card. if the card has been flipped, return true and identify card0ne as flipped
  function flippingCard() {
    if (endGame) return;
    if (this === cardOne) return;

    this.classList.add('flip')

    if (!flippedCard) {
        flippedCard = true;
        cardOne = this;
    return;
    }

//if card two is equal to this invoke matchedCard
cardTwo = this;
matchedCard();

}
//let first and second cards strictly have to match
function matchedCard() {
    let match = cardOne.dataset.runes === cardTwo.dataset.runes;
//if it is a match, don't flip the cards back over and lock them
    if (match) {
        lockCards();
    }
    else {
        unflipCards();
    }
// make it so the cards don't flip back over if there is a match
function lockCards() {
    cardOne.removeEventListener('click', flippingCard);
    cardTwo.removeEventListener('click', flippingCard);
reset();
}
//if the game ends, unflip the cards
 function unflipCards() {
    endGame = true;
        cardOne.classList.remove('flip')
        cardTwo.classList.remove('flip')
        reset();
 }
    }

// restart = document.getElementById('restart');
// restart.addEventListener("click", restart);

// function fullRestart() {

// }
