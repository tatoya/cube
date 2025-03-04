// Инициализация Telegram Web App
Telegram.WebApp.ready();

// Получаем данные пользователя
const user = Telegram.WebApp.initDataUnsafe.user;

// Функция для получения количества кубов
async function getCubeCount() {
    const response = await fetch(`http://ваш-сервер/api/cubes/${user.id}`);
    const data = await response.json();
    document.getElementById('cubeCount').textContent = data.cubeCount || 0;
}

// Функция для увеличения количества кубов
async function incrementCubeCount() {
    const response = await fetch(`http://ваш-сервер/api/cubes/${user.id}`, {
        method: 'POST',
    });
    const data = await response.json();
    document.getElementById('cubeCount').textContent = data.cubeCount;
}

// Обновляем отображение кубов при загрузке
getCubeCount();

// Обработка нажатия на кнопку
document.getElementById('farmButton').addEventListener('click', incrementCubeCount);
// Функция для загрузки лидерборда
async function loadLeaderboard() {
    const response = await fetch('http://ваш-сервер/api/leaderboard');
    const leaderboard = await response.json();

    const leaderboardList = document.getElementById('leaderboard');
    leaderboardList.innerHTML = ''; // Очистка списка

    leaderboard.forEach((user, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${user.firstName || 'Аноним'} (${user.cubeCount} кубов)`;
        leaderboardList.appendChild(listItem);
    });
}

// Загружаем лидерборд при загрузке страницы
loadLeaderboard();
