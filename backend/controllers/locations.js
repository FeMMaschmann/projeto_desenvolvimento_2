const db = require("./db_connection");

async function getLocations(req, res) {
  const row = await db.query(
    `SELECT Lat, Lon, CONCAT(u.FirstName, " ", u.LastName) 'UserName', u.BusinessName
            ,CONCAT(Street, ", ", AdressNumber) 'Adress'
            ,(SELECT COUNT(*) FROM Installations WHERE UserId = a.UserId) 'Instalations'
        FROM Adresses a JOIN Users u ON a.UserId = u.Id;`
  );
  res.send(row);
}

async function getAdressByUserId(req, res) {
  const row = await db.query(
    `SELECT ZipCode, Street, AdressNumber, AdressComplement, District, City, State FROM Adresses WHERE UserId = ?;`,
    [req.params.id]
  );
  res.send(row[0]);
}

module.exports = { getLocations, getAdressByUserId };
