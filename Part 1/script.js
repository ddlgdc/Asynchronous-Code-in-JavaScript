function getNumberFact(number){
    return fetch(`http://numbersapi.com/${number}?json`)
        .then(responce => responce.json())
        .then(data => data.text);
}

function displayFacts(facts){
    const numberFactsElement = document.getElementById('number-facts');
    facts.forEach(fact => {
        if (fact !== null) {
            const factParagraph = document.createElement('p');
            factParagraph.textContent = fact;
            numberFactsElement.appendChild(factParagraph);
        }
        else {
            console.error('Received a null fact.');
        }
    });
}

const favNumber = 5;
const request = [];
for(let i = 0; i < 4; i++){
    request.push(getNumberFact(favNumber));
}

Promise.all(request)
    .then(facts => {
        displayFacts(facts);
    })
    .catch(error => {
        console.error('Error fetching number facts:', error);
    });
