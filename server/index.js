const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
app.use(cors());
app.use(express.json());

const ACCOUNTS_FILE = path.join(__dirname, "accounts.json");

const loadAccounts = () => {
  try {
    const data = fs.readFileSync(ACCOUNTS_FILE, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const saveAccounts = (accounts) => {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
};

app.get("/accounts", (req, res) => {
  const accounts = loadAccounts();
  res.json(accounts);
});

app.post("/accounts", (req, res) => {
  const accounts = loadAccounts();
  accounts.push(req.body);
  saveAccounts(accounts);
  res.status(201).json(req.body);
});
app.put("/accounts/:id", (req, res) => {
  let accounts = loadAccounts();
  const idx = accounts.findIndex(acc => acc.id === req.params.id);
  if (idx >= 0) {
    accounts[idx] = req.body;
    saveAccounts(accounts);
    res.status(200).json(accounts[idx]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.delete("/accounts/:id", (req, res) => {
  let accounts = loadAccounts();
  accounts = accounts.filter((acc) => acc.id !== req.params.id);
  saveAccounts(accounts);
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

