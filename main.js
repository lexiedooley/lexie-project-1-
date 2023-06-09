const unshuffledCards = ['d', 'd', 's', 's', 'p', 'p', 'i', 'i', 'r', 'r', 'o', 'o'];
const cardsObj = {
  'd': "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7200_domination.png",
  's': "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7202_sorcery.png",
  'p': "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7201_precision.png",
  'i': "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7203_whimsy.png",
  'r': "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7204_resolve.png",
  'o': "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/runesicon.png"
};
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

// While there remain elements to shuffle.
  while (currentIndex != 0) {

 // Pick a remaining element.
 randomIndex = Math.floor(Math.random() * currentIndex);
 currentIndex--;

 // And swap it with the current element.
 [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
const shuffledCards = shuffle(unshuffledCards);
const shell = document.querySelector('.shell');
for (let i = 0; i < shuffledCards.length; i++) {

  const div = document.createElement('div');
  div.classList.add('card');

  const backImg = document.createElement('img');  
  backImg.classList.add('back');
  backImg.width = 64;
  backImg.height = 64;
  backImg.src=('https://upload.wikimedia.org/wikipedia/commons/2/2a/LoL_icon.svg');


  div.appendChild(backImg);
  div.setAttribute('data-runes', shuffledCards[i]);

  shell.appendChild(div);
}

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
    const img = card.childNodes[0];
    card.removeChild(img);
    const frontImg = document.createElement('img');
    frontImg.src = cardsObj[card.dataset.runes];
    card.appendChild(frontImg); 
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
    const firstCardImg = firstCard.childNodes[0];
    firstCard.removeChild(firstCardImg);

    const secondCardImg = secondCard.childNodes[0];
    secondCard.removeChild(secondCardImg);

    const backImg = document.createElement('img');
    backImg.width = 64;
    backImg.height = 64;
    backImg.src=('https://upload.wikimedia.org/wikipedia/commons/2/2a/LoL_icon.svg');
    
    const backImgTwo = document.createElement('img');
    backImgTwo.width = 64;
    backImgTwo.height = 64;
    backImgTwo.src=('https://upload.wikimedia.org/wikipedia/commons/2/2a/LoL_icon.svg');

    firstCard.appendChild(backImg);
    secondCard.appendChild(backImgTwo);

    firstCard.classList.remove('selected');
    secondCard.classList.remove('selected');
    firstCard = undefined;
    secondCard = undefined;
  }
  
  const selectedCards = document.querySelectorAll('div.selected');
  if (selectedCards.length === 12) {
    const win = document.querySelector('#outcomeSpanTag');
    win.textContent = 'You win!';
    gameRunning = false;
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('selected');
    }
  }

}

for (let i = 0; i < cards.length; i++) {
  cards[i].id = `card-${i}`;
  cards[i].addEventListener("click", async () => {
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
      console.log(card, 'card');
// assign the value of secondCard to be the third div
      secondCard = card;

      function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
      async function test () {
        console.log('start timer');
        await delay(1000);
        console.log('after 1 second');
      }
      await test();
// invoke checkMatch
      checkMatch();

    }
  });
}

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
        const loss = document.querySelector('#outcomeSpanTag');
        loss.textContent = 'You lose!';
        gameRunning = false;
      }

  //restart
  document.getElementById('restart').addEventListener('click', function () {
        clearInterval(intervalId);
        const win = document.querySelector('#outcomeSpanTag');
        win.textContent = '';
        startTimer(duration, display);
    for (let i = 0; i < cards.length; i++) {
      const img = cards[i].childNodes[0];
      cards[i].removeChild(img);

      const backImg = document.createElement('img');  
      backImg.classList.add('back');
      backImg.width = 64;
      backImg.height = 64;
      backImg.src=('https://upload.wikimedia.org/wikipedia/commons/2/2a/LoL_icon.svg');
      
      cards[i].appendChild(backImg);
      cards[i].classList.remove('selected');
    }

  })
  }, 1000);
}

window.onload = function () {
//how long we want the counter to be
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

