const memoryGrid = document.querySelector('.memory-game');
const clanList = [
    'uzumaki',
    'uchiha',
    'senju',
    'hyuga',
    'sarutobi',
    'aburame',
    'nara',
    'inuzuka',
    'akatsuki'
];

function addCard(nameIdx) {
    const newCard = document.createElement('div');
    const frontImg = document.createElement('img');
    const backImg = document.createElement('img');

    newCard.classList.add('memory-card');
    newCard.setAttribute('data-clan', clanList[nameIdx]);

    frontImg.classList.add('front-face');
    frontImg.setAttribute('src', `../img/${clanList[nameIdx]}-logo.png`);
    frontImg.setAttribute('alt', `${clanList[nameIdx]}`);

    backImg.classList.add('back-face');
    backImg.setAttribute('src', `../img/back-face.png`);
    backImg.setAttribute('alt', `Jutsu Memory Card`);

    newCard.appendChild(frontImg);
    newCard.appendChild(backImg);

    memoryGrid.appendChild(newCard);
}

function initCards(count) {
    for (let i = 0; i < count; i++) {
        const randomCardIdx = Math.floor(Math.random() * clanList.length);
        
        addCard(randomCardIdx, clanList);
        addCard(randomCardIdx, clanList);
    }
}