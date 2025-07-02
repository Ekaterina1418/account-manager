const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let accounts = [
    { label: "Основной", type: "LDAP", login: "admin", password: null },
    { label: "Test user", type: "Локальная", login: "user", password: "12345" }
]; 

app.get('/accounts', (req, res) => res.json(accounts));
app.post('/accounts', (req, res) => {
  accounts.push(req.body);
  res.status(201).json(req.body);
});
app.delete('/accounts/:login', (req, res) => {
  accounts = accounts.filter(acc => acc.login !== req.params.login);
  res.status(204).end();
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
