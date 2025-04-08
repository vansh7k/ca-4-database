const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Book = require('./models/Book');

require('dotenv').config();

const app = express();
app.use(express.json());


// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected')).catch(err => console.log(err));
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});


app.post('/books', async (req, res) => {
  try {
    const { title, author, status, userId } = req.body;
    const book = new Book({ title, author, status, userId });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

app.get('/books/:userId', async (req, res) => {
  try {
    const books = await Book.find({ userId: req.params.userId });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
