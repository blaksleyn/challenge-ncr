var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const { conn } = require("./Db/index.js");
const initDB = require("./utilities/initDB");
const cuentasRouter = require("./routes/cuentas");
const transferenciaRouter = require("./routes/transferencias");
const clienteRouter = require("./routes/cliente");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/cuentas", cuentasRouter);
app.use("/api/transferencias", transferenciaRouter);
app.use("/api/cliente", clienteRouter);

// Se implementa para que en el resto de las rutas que no son /api la app tome el ruteo de React
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

conn
  .sync({
    force: false,
  })
  .then(() => {
    app.listen(1500, async () => {
      console.log("%s listening at http://localhost:1500");
      await initDB();
    });
  });

module.exports = app;
