let coins = 0;
const cube = document.getElementById('cube');
const coinsDisplay = document.getElementById('coins');

// Функция для перемещения кубика
function moveCube() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Генерация случайных координат
    const randomX = Math.random() * (screenWidth - 100); // 100 - ширина кубика
    const randomY = Math.random() * (screenHeight - 100); // 100 - высота кубика

    // Установка новых координат
    cube.style.left = `${randomX}px`;
    cube.style.top = `${randomY}px`;
}

// Функция для анимации кубика
function animateCube() {
    cube.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;
}

// Обработчик клика на кубик
cube.addEventListener('click', () => {
    coins++;
    coinsDisplay.textContent = coins;
    animateCube();
    moveCube();
});

// Перемещение кубика каждые 2 секунды
setInterval(moveCube, 2000);

// Инициализация начального положения кубика
moveCube();
