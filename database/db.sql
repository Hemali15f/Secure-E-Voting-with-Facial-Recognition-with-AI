CREATE DATABASE IF NOT EXISTS vote;
USE vote;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  face_image_path VARCHAR(255)
);
