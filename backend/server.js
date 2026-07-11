const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let reviews = [
  { id: 1, gameId: "3498", username: "Gamer_King", text: "ეს უბრალოდ ლეგენდარული თამაშია! ყველას ვურჩევ." },
  { id: 2, gameId: "3498", username: "CyberSamurai", text: "გრაფიკა კარგია, მაგრამ ოპტიმიზაცია ცოტას კოჭლობს." }
];

app.get('/', (req, res) => {
  res.send('🚀 CoreGames API სერვერი მუშაობს!');
});

app.get('/api/reviews/:gameId', (req, res) => {
  const { gameId } = req.params;
  const gameReviews = reviews.filter(review => review.gameId === String(gameId));
  res.json(gameReviews);
});

app.post('/api/reviews', (req, res) => {
  const { gameId, username, text } = req.body;

  if (!gameId || !username || !text || !text.trim()) {
    return res.status(400).json({ error: "ყველა ველი აუცილებელია!" });
  }

  const newReview = {
    id: Date.now(),
    gameId: String(gameId),
    username,
    text
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});
