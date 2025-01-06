const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('users.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }

  try {
    const checkUserStmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const existingUser = checkUserStmt.get(email);

    if (existingUser) {
      res.status(400).json({ message: 'Пользователь с таким email уже зарегистрирован' });
      return;
    }

    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    stmt.run(name, email, password);

    res.status(200).json({ message: 'Реєстрація успішна' });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при реєстрації', error: error.message });
  }
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
  const user = stmt.get(email, password);

  if (user) {
    res.status(200).json({ message: 'Авторизація успішна' });
  } else {
    res.status(400).json({ message: 'Невірні дані' });
  }
});

app.listen(3001, () => {
  console.log('Сервер на http://localhost:3001');
});