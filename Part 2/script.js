const cardInfoElement = document.getElementById('card-info');
const drawCardButton = document.getElementById('draw-card');
let deckId = null;

function createNewDeck(){
    return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(data => data.deck_id);
}

function drawCard(deckId){
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(responce => responce.json())
        .then(data => data.cards[0]);
}

function displayCard(card){
    const cardTextElement = document.getElementById('card-text');
    const cardImageElement = document.getElementById('card-image');

    if(card){
        const cardText = `${card.value} of ${card.suit}`;
        cardTextElement.textContent = cardText;
        cardImageElement.src = card.image;
    }
    else {
        cardTextElement.textContent = 'No more cards in the deck.';
        drawCardButton.disabled = true;
    }
}

createNewDeck().then(id => {
    deckId = id;
    drawCardButton.style.display = 'block';
});

drawCardButton.addEventListener('click', () => {
    drawCard(deckId)
        .then(displayCard)
        .catch(error => console.error('Error drawing a card.', error));
});
