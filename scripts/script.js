const btnStart = document.getElementById('start-game');
let cards = document.querySelectorAll('.memory-card');
const title = document.querySelector('h1');
let countCards = cards.length;

let winGame = false;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.clan === secondCard.dataset.clan;
    checkCards(countCards);
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function clearCards() {
    const grid = document.querySelector('.memory-game');
    grid.innerHTML = '';
}

function startCountdown(minutes, seconds) {
    let totalSeconds = minutes * 60 + seconds;

    const interval = setInterval(() => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        title.textContent = `Game started: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (totalSeconds <= 0) {
            clearInterval(interval);
            title.textContent = "Time is up! Game Over!";
            lockBoard = true;
        }

        if (winGame) {
            clearInterval(interval);
            winGame = false;
            title.innerText = `Game completed: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }

        totalSeconds--;
    }, 1000);
}


function checkCards(count) {
    const flippedCards = document.querySelectorAll('.flip');
    console.log(count);
    console.log(flippedCards.length);
    if (count == flippedCards.length) {
        alert('Congrats!\nYou\'ve completed memory game!');
        title.innerText = 'Game completed!';
        winGame = true;
    }
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

const startGame = () => {
    const level = +prompt('Select level( easy - 1, medium - 2, high - 3 ): ');
    const count = +prompt('Enter your count: ');

    clearCards();
    initCards(count);

    switch(level) {
        case 1:
            startCountdown(3, 0);
            break;
        case 2:
            startCountdown(1, 50);
            break;
        case 3:
            startCountdown(0, 30);
            break;
        default:
            startCountdown(3, 0);
            break;
    }

    cards = document.querySelectorAll('.memory-card');
    countCards = cards.length;
    cards.forEach(card => card.addEventListener('click', flipCard));
};

btnStart.addEventListener('click', startGame);