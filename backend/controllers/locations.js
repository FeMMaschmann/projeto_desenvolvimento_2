const db = require("./db_connection");

async function getLocations(req, res) {
  const row = await db.query(
    `SELECT Lat, Lon, CONCAT(u.FirstName, " ", u.LastName) 'UserName', u.BusinessName
            ,CONCAT(Street, ", ", AdressNumber) 'Adress'
            ,(SELECT COUNT(*) FROM Installations WHERE UserId = a.UserId) 'Instalations'
            ,u.Id
        FROM Adresses a JOIN Users u ON a.UserId = u.Id;`
  );
  res.send(row);
}

async function getLocationById(req, res) {
  const row = await db.query(
    `SELECT CONCAT(u.FirstName, " ", u.LastName) 'UserName'
            ,CONCAT(Street, ", ", AdressNumber) 'Adress'
            ,(SELECT COUNT(*) FROM Installations WHERE UserId = a.UserId) 'Instalations'
            ,u.PhoneNumber
        FROM Adresses a JOIN Users u ON a.UserId = u.Id
        WHERE u.Id = ?;`,
    [req.params.id]
  );
  res.send(row[0]);
}

async function getAdressByUserId(req, res) {
  const row = await db.query(
    `SELECT ZipCode, Street, AdressNumber, AdressComplement, District, City, State FROM Adresses WHERE UserId = ?;`,
    [req.params.id]
  );
  res.send(row[0]);
}

async function updateAdressByUserId(req, res) {
  const countRow = await db.query(
    `SELECT COUNT(*) 'c' FROM Adresses WHERE UserId = ?`,
    [req.params.id]
  );
  console.log(countRow[0].c);
  if (countRow[0].c === 1) {
    const adressRow = await db.query(
      `UPDATE Adresses SET Lat = ?, Lon = ?, ZipCode = ?, Street = ?, AdressNumber = ?, AdressComplement = ?, District = ?, City = ?, State = ? WHERE UserId = ?;`,
      [
        req.body.Lat,
        req.body.Lon,
        req.body.ZipCode,
        req.body.Street,
        req.body.AdressNumber,
        req.body.AdressComplement,
        req.body.District,
        req.body.City,
        req.body.State,
        req.params.id,
      ]
    );
  } else {
    const adressRow = await db.query(
      `INSERT INTO Adresses (UserId, Lat, Lon, ZipCode, Street, AdressNumber, AdressComplement, District, City, State) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        req.params.id,
        req.body.Lat,
        req.body.Lon,
        req.body.ZipCode,
        req.body.Street,
        req.body.AdressNumber,
        req.body.AdressComplement,
        req.body.District,
        req.body.City,
        req.body.State,
      ]
    );
  }
  const businessRow = await db.query(
    `UPDATE Users SET BusinessName = ? WHERE id = ?;`,
    [req.body.BusinessName, req.params.id]
  );

  res.send("Ok");
}

module.exports = {
  getLocations,
  getLocationById,
  getAdressByUserId,
  updateAdressByUserId,
};
