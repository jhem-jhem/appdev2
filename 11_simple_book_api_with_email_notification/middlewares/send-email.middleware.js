const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendBookCreatedEmail = async (book) => {
  try {
    const html = pug.renderFile(
      path.join(__dirname, '..', 'views', 'bookCreated.pug'),
      {
        title: book.title,
        author: book.author,
        year: book.year
      }
    );

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Book Added to the System',
      html
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully.');
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
  }
};

module.exports = sendBookCreatedEmail;
