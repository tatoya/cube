let coins = 0;
const cube = document.getElementById('cube');
const coinsDisplay = document.getElementById('coins');

cube.addEventListener('click', () => {
    coins++;
    coinsDisplay.textContent = coins;
    animateCube();
});

function animateCube() {
    cube.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;
}
