let deckId;

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
    });
}

function drawCard() {
  //draws two cards from the deck using deck id generated from new deck button
  const fetchString = `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`;

  fetch(fetchString)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      console.log(data.remaining);
    });
}

document.getElementById("new-deck").addEventListener("click", handleClick);

document.getElementById("draw-card").addEventListener("click", drawCard);
