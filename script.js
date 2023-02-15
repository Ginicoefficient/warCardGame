let deckId = "";
let playerScore = 0;
let computerScore = 0;
const cardContainer = document.getElementById("card-container");
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-card");
const cardsRemaining = document.getElementById("cards-remaining");
const outcomeText = document.getElementById("outcome-text");
const playerScoreHtml = document.getElementById("player-score");
const computerScoreHtml = document.getElementById("computer-score");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      cardsRemaining.innerHTML = `Cards Remaining: ${data.remaining}`;
      cardsRemaining.style.visibility = "visible";
      drawCardBtn.disabled = false;
    });
}

function drawCard() {
  //draws two cards from the deck using deck id generated from new deck button
  const fetchString = `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`;

  fetch(fetchString)
    .then((res) => res.json())
    .then((data) => {
      cardsRemaining.innerHTML = `Cards Remaining: ${data.remaining}`;
      cardContainer.children[0].innerHTML = `<img src=${data.cards[0].image} class="card" /> `;
      cardContainer.children[1].innerHTML = `<img src=${data.cards[1].image} class="card" /> `;

      outcomeText.innerHTML = whoWins(data.cards[0], data.cards[1]);

      playerScoreHtml.innerHTML = `Player Score: ${playerScore}`;
      computerScoreHtml.innerHTML = `Computer Score: ${computerScore}`;

      if (data.remaining === 0) {
        cardsRemaining.innerHTML = `Cards Remaining: ${data.remaining}`;
        drawCardBtn.disabled = true;
        if (playerScore > computerScore) {
          outcomeText.innerHTML = "The player wins the whole game!";
        } else if (playerScore < computerScore) {
          outcomeText.innerHTML = "Darn! The Computer wins this time!";
        } else {
          outcomeText.innerHTML = "It was a clean tie!";
        }
      }
    });
}

function whoWins(card1Value, card2Value) {
  //compare the value of card1 and card2 to determine which has the highest score
  //accepts the string value from the card object in the data.cards array

  //two solution thoughts: use object with card names and values OR
  //use a simple array where the position of a card = value, and seek index of card

  const cardValue = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
  };

  if (cardValue[card1Value.value] > cardValue[card2Value.value]) {
    computerScore += 1;
    return "Computer wins!";
  } else if (cardValue[card1Value.value] < cardValue[card2Value.value]) {
    playerScore += 1;
    return "Player wins!";
  } else if (cardValue[card1Value.value] == cardValue[card2Value.value]) {
    return "War!!";
  }
}

newDeckBtn.addEventListener("click", handleClick);

drawCardBtn.addEventListener("click", drawCard);
