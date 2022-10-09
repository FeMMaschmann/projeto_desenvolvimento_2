const db = require("./db_connection");

async function getLocations(req, res) {
  const row = await db.query(
    `SELECT Lat, Lon, CONCAT(u.FirstName, " ", u.LastName) 'UserName'
            ,CONCAT(Street, ", ", AdressNumber) 'Adress'
            ,(SELECT COUNT(*) FROM Installations WHERE UserId = a.UserId) 'Instalations'
        FROM Adresses a JOIN Users u ON a.UserId = u.Id;`
  );
  res.send(row);
}

module.exports = { getLocations };
