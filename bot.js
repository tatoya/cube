const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Токен вашего бота
const token = 7878980819:AAGC3f8YkL5bC8fWBHRVKYiNHB9t-8BYfZM; // Замените на токен вашего бота

// URL вашего приложения
const webAppUrl = 'https://cube-coin.vercel.app'; // Замените на ваш URL

// Создание бота
const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Отправка сообщения с кнопкой для запуска Web App
  bot.sendMessage(chatId, 'Добро пожаловать в CUBE COIN!', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Играть',
            web_app: { url: webAppUrl }, // Ссылка на ваше приложение
          },
        ],
      ],
    },
  });
});

// Запуск сервера (опционально, если нужно обрабатывать данные от Web App)
app.use(express.json());

app.post('/web-data', (req, res) => {
  const { queryId, coins } = req.body;

  // Отправка данных обратно в Telegram
  bot.answerWebAppQuery(queryId, {
    type: 'article',
    id: queryId,
    title: 'Ваши монеты',
    input_message_content: {
      message_text: `Вы заработали ${coins} монет!`,
    },
  });

  res.status(200).json({});
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
