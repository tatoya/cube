let coins = 0;
const cube = document.getElementById('cube');
const coinsDisplay = document.getElementById('coins');
const coinSound = document.getElementById('coinSound');

// Обработчик клика на кубик
cube.addEventListener('click', () => {
    coins++;
    coinsDisplay.textContent = coins;

    // Воспроизведение звука
    coinSound.currentTime = 0; // Перемотка звука на начало
    coinSound.play();

    // Анимация кубика
    cube.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) scale(0.95)`;
    setTimeout(() => {
        cube.style.transform = `rotateX(25deg) rotateY(45deg) scale(1)`;
    }, 200);
});
