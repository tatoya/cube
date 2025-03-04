// Обработчик кликов по кубу
cube.addEventListener('click', () => {
    cubcoins++;
    scoreDisplay.textContent = `CubCoins: ${cubcoins}`;
    updateServer();
});

// Отправка данных на сервер
async function updateServer() {
    try {
        const response = await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, cubcoins: 1 }), // Отправляем 1 CubCoin за каждый клик
        });

        if (!response.ok) {
            throw new Error('Server response was not OK');
        }

        const data = await response.json();
        console.log('Server response:', data); // Логируем ответ сервера
        updateLeaderboard();
    } catch (error) {
        console.error('Error updating server:', error);
    }
}
