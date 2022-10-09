const db = require("./db_connection");

async function getLocations(req, res) {
  const row = await db.query(
    `SELECT Lat, Lon, CONCAT(Street, ", ", AdressNumber) 'Adress'
            ,(SELECT COUNT(*) FROM Installations WHERE UserId = a.UserId) 'Instalations'
      FROM Adresses a;`
  );
  res.send(row);
}

module.exports = { getLocations };
