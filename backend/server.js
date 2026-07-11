const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // აძლევს უფლებას შენს React-ს (პორტ 5173-დან) დაუკავშირდეს ამ ბექენდს
app.use(express.json()); // პოსტ რექვესთებიდან მოსული JSON მონაცემების წასაკითხად

// 📦 იმიტირებული მონაცემთა ბაზა მეხსიერებაში (In-Memory Database)
// ჩავუწეროთ სატესტო მონაცემები, რომ თავიდანვე დავინახოთ მუშაობა
let reviews = [
  { id: 1, gameId: "3498", username: "Gamer_King", text: "ეს უბრალოდ ლეგენდარული თამაშია! ყველას ვურჩევ." },
  { id: 2, gameId: "3498", username: "CyberSamurai", text: "გრაფიკა კარგია, მაგრამ ოპტიმიზაცია ცოტას კოჭლობს." }
];

// -------------------------------------------------------------
// 🟢 1. GET მეთოდი - კონკრეტული თამაშის კომენტარების წამოსაღებად
// -------------------------------------------------------------
app.get('/api/reviews/:gameId', (req, res) => {
  const { gameId } = req.params;
  
  // ვფილტრავთ კომენტარებს თამაშის ID-ის მიხედვით
  const gameReviews = reviews.filter(review => review.gameId === gameId);
  
  res.json(gameReviews);
});

// -------------------------------------------------------------
// 🔵 2. POST მეთოდი - ახალი კომენტარის დასამატებლად
// -------------------------------------------------------------
app.post('/api/reviews', (req, res) => {
  const { gameId, username, text } = req.body;

  // მარტივი ვალიდაცია ბექენდის მხარეს
  if (!gameId || !username || !text.trim()) {
    return res.status(400).json({ error: "ყველა ველი აუცილებელია!" });
  }

  // ახალი კომენტარის ობიექტი
  const newReview = {
    id: reviews.length + 1,
    gameId: String(gameId),
    username,
    text
  };

  reviews.push(newReview); // ვამატებთ "ბაზაში"
  
  res.status(201).json(newReview); // ვაბრუნებთ შექმნილ კომენტარს წარმატების სტატუსით
});

// სერვერის გაშვება
app.listen(PORT, () => {
  console.log(`🚀 ბექენდ სერვერი წარმატებით გაიშვა პორტზე: http://localhost:${PORT}`);
});