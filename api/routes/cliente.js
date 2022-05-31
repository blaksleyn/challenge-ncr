var express = require("express");
var router = express.Router();

const { getClientes } = require("../controllers/cliente.controller");

router.get("/", getClientes);

module.exports = router;
