const db = require("./db_connection");

async function insert(req, res) {
  const row = await db.query(
    `INSERT INTO Users (FirstName, LastName, Email, Password, CreationDate) VALUES (?, ?, ?, ?,now());`,
    [req.body.firstName, req.body.lastName, req.body.email, req.body.password]
  );

  res.send("OK");
}

module.exports = { insert };
