const memoryGrid = document.querySelector('.memory-game');

function initCards(count) {
    for (let i = 0; i < count; i++) {
        const newCard = document.createElement('div');
        
        memoryGrid.appendChild(newCard);
    }
}