const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const locationsRouter = require("./routes/locations");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/locations", locationsRouter);

app.listen(port, () => console.log(`APP na porta ${port}!`));
