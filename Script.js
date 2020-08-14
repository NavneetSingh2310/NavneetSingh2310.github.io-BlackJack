let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven', 'Six',
    'Five', 'Four', 'Three', 'Two'
];

let textArea = document.getElementById('text-area');
let dealerDiv = document.getElementById('dealer');
let playerDiv = document.getElementById('player');
let newGameButton = document.getElementById('new-game-button');
let newGameButton2 = document.getElementById('new-game');
let hitButton = document.getElementById('hit-button');
let standButton = document.getElementById('stand-button');
let scoreDiv = document.getElementById('score-div');
let resultArea = document.getElementById('result-area')
let imageDiv = document.getElementById('img-div')
let copyright = document.getElementById('copyright')
let dealAmount = document.getElementById('deal-amount')
let dealAmount2 = document.getElementById('deal-amount2')
let newgameDiv = document.getElementById('new-game-div')
let billContainer = document.getElementById('container')
let music = document.getElementById('music')
hitButton.style.display = 'none'
standButton.style.display = 'none'

let gameStart = false,
    gameOver = false,
    playerWon = false,
    Amount = parseInt(dealAmount.value),
    totalWinning=0,
    isTie = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];





    


dealAmount.addEventListener('click', function () {
    Amount = parseInt(dealAmount.value);
})

dealAmount2.addEventListener('change', function () {
    Amount = parseInt(dealAmount2.value);
})

newgameDiv.style.display='none'
newGameButton2.addEventListener('click', function () {
    gameStart = true;
    gameOver = false;
    playerWon = false;
    isTie = false;
    music.src = "audio/jackpot.mp3";
    billContainer.style.display='none'
    resultArea.innerHTML = "";
    imageDiv.style.display = 'none'
    copyright.style.display = 'none'
    textArea.style.display = 'inherit'
    dealAmount.style.display = 'none'
    newgameDiv.style.display ='none'
    document.getElementById('main-div').style.display = "block";
    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    showStatus();
})


newGameButton.addEventListener('click', function () {
    gameStart = true;
    gameOver = false;
    playerWon = false;
    isTie = false;
    music.src = "audio/jackpot.mp3";
    resultArea.innerHTML = "";
    imageDiv.style.display = 'none'
    copyright.style.display = 'none'
    textArea.style.display = 'inherit'
    dealAmount.style.display = 'none'
    billContainer.style.display = 'none'
    document.getElementById('main-div').style.display = "block";
    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    showStatus();
})

function createDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            let card = {
                suit: suits[suitIndex],
                value: values[valueIndex]
            }
            deck.push(card);
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let randomIndex = Math.trunc(Math.random() * deck.length);
        let temp = deck[randomIndex];
        deck[randomIndex] = deck[i];
        deck[i] = temp;
    }
}

hitButton.addEventListener('click', function () {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

standButton.addEventListener('click', function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

function checkForEndOfGame() {
  
    updateScores();
   
    if (gameOver) {
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }

    if (playerScore == dealerScore) {
        console.log("equal")
        isTie = true;
        gameOver = true;
    }
    else if (playerScore == 21) {
        playerWon = true;
        gameOver = true;
        totalWinning += Amount;
    }
    else if (dealerScore == 21) {
        playerWon = false;
        gameOver = true;
        totalWinning -= Amount;
    }
   else if (playerScore > 21) {
        console.log("player>21")
        playerWon = false;
        gameOver = true;
        totalWinning -= Amount;
    }
    else if (dealerScore >= 21) {
        console.log("dealer>21")
        playerWon = true;
        gameOver = true;
        totalWinning += Amount;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            console.log("player>dealer")
            playerWon = true;
            totalWinning += Amount;
        }
        else {
            playerWon = false;
            totalWinning -= Amount;
        }
    }
}

function getCardString(card) {
    return card.value + " of " + card.suit;
}

function getCardNumericValue(card) {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
    }
}

function showStatus() {

    console.log("show status")
    console.log(playerScore)
    console.log(dealerScore)
    if (!gameStart) {
        textArea.innerText = 'Welcome to Blackjack!';
        return;
    }


    dealerDiv.innerHTML = "";
    for (let i = 0; i < dealerCards.length - 1; i++) {

        renderDealerCards(dealerCards[i]);


    }


    addExtraCard()


    playerDiv.innerHTML = "";
    for (let i = 0; i < playerCards.length; i++) {

        renderPlayerCards(playerCards[i]);

    }

    updateScores();

    scoreDiv.innerText = 'Dealer has:\n' +

        ' score: ' + dealerScore + '\n\n' + 'Player has:\n' +

        'score: ' + playerScore + '\n\n' +
        'Total winnings = $' + totalWinning;

    if (gameOver) {
        
        if (isTie) {
            resultArea.innerText = "Its a tie! 🤝";
            resetButtons();
            music.src = "audio/tie.mp3";
          
           
        }
        else if (playerWon) {
            resultArea.innerText = "You Win! 😀";
            resetButtons();
            music.src = "audio/clapping.mp3";
           
        }
        else {
            resultArea.innerText = "Dealer Wins! 😶";
            resetButtons();
            music.src = "audio/loser.mp3";
           
        }
      
        newGameButton.style.display = 'none';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';

    }
}

function getPlayerScore(cardArray) {
    console.log(cardArray)
    let score = 0;
    let hasAce = false;

    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        
        score += getCardNumericValue(card);
        if (card.value == 'Ace') {
            hasAce = true;
        }

        if (hasAce && score + 10 <= 21) {
             score += 10;
        }
    }
        return score;
    }

function getDealerScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length - 1; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value == 'Ace') {
            hasAce = true;
        }

        if (hasAce && score + 10 <= 21) {
             score += 10;
        }
    }
    return score;
}

function updateScores() {
   
    dealerScore = getDealerScore(dealerCards);
    playerScore = getPlayerScore(playerCards);
}

function getNextCard() {
    return deck.shift();
}

function renderDealerCards(card) {
    let div1 = document.createElement('div');
    var icon = '';
    if (card.suit == 'Hearts')
        icon = '&hearts;';
    else if (card.suit == 'Spades')
        icon = '&spades;';
    else if (card.suit == 'Diamonds')
        icon = '&diams;';
    else
        icon = '&clubs;';

    div1.className = 'card';
    div1.innerHTML = card.value + '<br/>' + icon;


    dealerDiv.appendChild(div1);
   
}

function renderPlayerCards(card) {
    let div1 = document.createElement('div');
    var icon = '';
    if (card.suit == 'Hearts')
        icon = '&hearts;';
    else if (card.suit == 'Spades')
        icon = '&spades;';
    else if (card.suit == 'Diamonds')
        icon = '&diams;';
    else
        icon = '&clubs;';

    div1.className = 'card';

    if (card.suit == 'Hearts' || card.suit == 'Diamonds') {
        div1.id = 'card-red';
    }
    div1.innerHTML = card.value + '<br/>' + icon;


    playerDiv.appendChild(div1);

}


function addExtraCard() {
    let div2 = document.createElement('div');
    div2.className = 'card';
    div2.id = 'card-extra';
   
    div2.innerHTML = '&nbsp;' + '<br/>'+'&nbsp;';
    dealerDiv.appendChild(div2);
}


function resetButtons() {
    newgameDiv.style.display =  'inherit'
   
}

