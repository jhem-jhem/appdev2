// const express = require('express');
// const router = express.Router();
// const User = require('../models/user.model');

// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find({}, 'name email');
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch users.' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('userId', 'name email'); // show user's name & email
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books.' });
  }
});

module.exports = router;
