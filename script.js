// Инициализация Telegram Web App
Telegram.WebApp.ready();

// Получаем данные пользователя
const user = Telegram.WebApp.initDataUnsafe.user;
let cubeCount = localStorage.getItem(`cubeCount_${user.id}`) || 0;

// Обновляем отображение кубов
document.getElementById('cubeCount').textContent = cubeCount;

// Обработка нажатия на кнопку
document.getElementById('farmButton').addEventListener('click', () => {
    cubeCount++;
    document.getElementById('cubeCount').textContent = cubeCount;
    localStorage.setItem(`cubeCount_${user.id}`, cubeCount);
});