var express = require("express");
var router = express.Router();

// Controllers
const {
  getTransferencia,
  postTransferencia,
} = require("../controllers/transferencias.controller");

/* GET users listing. */
router.post("/crearTransferencia/:id", postTransferencia);
router.get("/:id", getTransferencia);

module.exports = router;
