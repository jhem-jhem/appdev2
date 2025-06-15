const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');
const sendBookCreatedEmail = require('../middlewares/send-email.middleware');

router.post('/', async (req, res) => {
  try {
    const { title, author, year } = req.body;

    const newBook = new Book({ title, author, year });
    await newBook.save();

    await sendBookCreatedEmail(newBook);

    res.status(201).json({
      message: 'Book created and email sent',
      book: newBook
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to create book',
      details: err.message
    });
  }
});

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});


module.exports = router;
