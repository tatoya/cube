const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/cubcoin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Схема и модель для игроков
const playerSchema = new mongoose.Schema({
    username: String,
    cubcoins: { type: Number, default: 0 },
});

const Player = mongoose.model('Player', playerSchema);

// Роут для получения лидерборда
app.get('/leaderboard', async (req, res) => {
    try {
        const players = await Player.find().sort({ cubcoins: -1 }).limit(10);
        res.json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Роут для обновления очков игрока
app.post('/update', async (req, res) => {
    const { username, cubcoins } = req.body;

    try {
        let player = await Player.findOne({ username });

        if (!player) {
            player = new Player({ username, cubcoins });
        } else {
            player.cubcoins += cubcoins;
        }

        await player.save();
        res.json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
