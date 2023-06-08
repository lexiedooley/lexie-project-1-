const cards = document.querySelectorAll('div.card');


let firstCard;
let secondCard;

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
//shuffle the cards
//reset game