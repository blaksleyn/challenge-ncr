var express = require("express");
var router = express.Router();

// Controllers
const {
  getCuentasByClient,
  getCuentaById,
} = require("../controllers/cuentas.controller");

/* GET users listing. */
router.get("/:id", getCuentasByClient);
router.get("/cuentaById/:idcuenta/:idcliente", getCuentaById);

module.exports = router;
