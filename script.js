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
