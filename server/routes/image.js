const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../db'); // MySQL DB connection

const router = express.Router();

router.post('/upload', (req, res) => {
  const { imageData, email, name } = req.body;

  if (!imageData || !email || !name) {
    return res.status(400).json({ message: 'Missing image, email, or name' });
  }

  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');

  const safeEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `${safeEmail}.jpg`;
  const filepath = path.join(__dirname, '..', 'uploads');

  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
  }

  const fullPath = path.join(filepath, filename);

  fs.writeFile(fullPath, imageBuffer, (err) => {
    if (err) {
      console.error('Image save error:', err);
      return res.status(500).json({ message: 'Failed to save image' });
    }

    // Save user info in MySQL
    const sql = 'INSERT INTO users (name, email, face_image_path) VALUES (?, ?, ?)';
    db.query(sql, [name, email, fullPath], (error, results) => {
      if (error) {
        console.error('MySQL error:', error);
        return res.status(500).json({ message: 'Failed to save user in database' });
      }

      res.json({ message: 'Image and user saved successfully' });
    });
  });
});

module.exports = router;
