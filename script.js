let cubcoins = 0; // Счетчик CubCoins
let username = null; // Имя пользователя

// Элементы интерфейса
const cube = document.getElementById('cube');
const scoreDisplay = document.getElementById('score');
const leaderboardDisplay = document.getElementById('leaderboard');

// Инициализация Telegram Web App
Telegram.WebApp.ready();

// Получаем данные пользователя из Telegram
const user = Telegram.WebApp.initDataUnsafe.user;
if (user) {
    // Используем username из Telegram, если он есть, иначе используем user_id
    username = user.username || `user_${user.id}`;
} else {
    // Если данные пользователя недоступны, используем анонимное имя
    username = 'anonymous';
}

// Обработчик кликов по кубу
cube.addEventListener('click', () => {
    cubcoins++; // Увеличиваем счетчик CubCoins
    scoreDisplay.textContent = `CubCoins: ${cubcoins}`; // Обновляем отображение счета
    updateServer(); // Отправляем данные на сервер
});

// Функция для отправки данных на сервер
async function updateServer() {
    try {
        // Отправляем POST-запрос на сервер с данными игрока
        const response = await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, cubcoins: 1 }), // Отправляем 1 CubCoin за каждый клик
        });

        // Проверяем, что ответ сервера успешный
        if (!response.ok) {
            throw new Error('Server response was not OK');
        }

        const data = await response.json();
        console.log('Server response:', data); // Логируем ответ сервера
        updateLeaderboard(); // Обновляем лидерборд
    } catch (error) {
        console.error('Error updating server:', error);
    }
}

// Функция для обновления лидерборда
async function updateLeaderboard() {
    try {
        // Запрашиваем данные лидерборда с сервера
        const response = await fetch('/leaderboard');
        const data = await response.json();

        // Форматируем данные лидерборда
        const leaderboardText = data.map((player, index) => 
            `${index + 1}. ${player.username}: ${player.cubcoins}`
        ).join('\n');

        // Обновляем отображение лидерборда
        leaderboardDisplay.textContent = `Leaderboard:\n${leaderboardText}`;
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
}

// Инициализация лидерборда при загрузке страницы
updateLeaderboard();
