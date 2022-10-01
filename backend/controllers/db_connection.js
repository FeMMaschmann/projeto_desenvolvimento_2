const mysql = require("mysql2/promise");
const config = {
  db: {
    user: "root",
    host: "localhost",
    database: "InstallerProject",
    password: "",
  },
};

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};
