const db = require("./db_connection");

async function insert(req, res) {
  const row = await db.query(
    `INSERT INTO Users (FirstName, LastName, Email, Password, CreationDate) VALUES (?, ?, ?, ?,now());`,
    [req.body.firstName, req.body.lastName, req.body.email, req.body.password]
  );

  res.send("OK");
}

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (email === "" || password === "") {
    res.status(404).send("ERROR - User not found");
  }
  const row = await db.query(
    `SELECT * FROM Users WHERE Email = ? AND Password = ?`,
    [req.body.email, req.body.password]
  );

  res.send(row);
}

module.exports = { insert, login };
