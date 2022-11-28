const db = require("./db_connection");

async function getInstallationById(req, res) {
  const row = await db.query(
    `SELECT DATE_FORMAT(InstallationDate, "%d/%m/%Y") 'InstallationDate', Description, ClientName, Vehicle FROM Installations WHERE UserId = ? ORDER BY Id DESC;`,
    [req.params.id]
  );
  res.send(row);
}

async function insert(req, res) {
  const row = await db.query(
    `INSERT INTO Installations (UserId, InstallationDate, Description, ClientName, Vehicle) VALUES (?, now(), ?, ?, ?);`,
    [
      req.body.UserId,
      req.body.Description,
      req.body.ClientName,
      req.body.Vehicle,
    ]
  );

  res.send("OK");
}

module.exports = { getInstallationById, insert };
