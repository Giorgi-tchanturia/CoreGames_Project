const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(cors()); 
app.use(express.json()); 



let reviews = [
  { id: 1, gameId: "3498", username: "Gamer_King", text: "ეს უბრალოდ ლეგენდარული თამაშია! ყველას ვურჩევ." },
  { id: 2, gameId: "3498", username: "CyberSamurai", text: "გრაფიკა კარგია, მაგრამ ოპტიმიზაცია ცოტას კოჭლობს." }
];

//GET მეთოდი 

app.get('/api/reviews/:gameId', (req, res) => {
  const { gameId } = req.params;
  
  const gameReviews = reviews.filter(review => review.gameId === gameId);
  
  res.json(gameReviews);
});


// POST მეთოდი 

app.post('/api/reviews', (req, res) => {
  const { gameId, username, text } = req.body;


  if (!gameId || !username || !text.trim()) {
    return res.status(400).json({ error: "ყველა ველი აუცილებელია!" });
  }


  const newReview = {
    id: reviews.length + 1,
    gameId: String(gameId),
    username,
    text
  };

  reviews.push(newReview); 
  
  res.status(201).json(newReview); 
});


app.listen(PORT, () => {
  console.log(`🚀 ბექენდ სერვერი წარმატებით გაიშვა პორტზე: http://localhost:${PORT}`);
});
