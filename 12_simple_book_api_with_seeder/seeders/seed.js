const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

// Import your models
const Book = require('../models/book.model');
const User = require('../models/user.model'); // You'll create this model if not yet done

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Book.deleteMany({});
    await User.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Seed users
    const users = [];
    const password = await bcrypt.hash('secret123', 10);
    for (let i = 0; i < 5; i++) {
      users.push(await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password
      }));
    }
    console.log('👤 Seeded users');

    // Seed books
    for (let i = 0; i < 10; i++) {
      await Book.create({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        year: faker.number.int({ min: 1990, max: 2024 }),
        userId: faker.helpers.arrayElement(users)._id
      });
    }
    console.log('📚 Seeded books');

    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seed();
