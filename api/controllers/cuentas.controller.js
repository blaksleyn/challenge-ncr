const { Cuenta } = require("../Db/index");

const getCuentasByClient = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json({ message: "No existe el parametro de busqueda" });
  }
  const { id } = req.params;

  const cuentas = await Cuenta.findAll({
    where: {
      cliente_id: id,
    },
  });
  if (!cuentas) {
    return res.status(400).json({ message: "No existe el cliente" });
  }
  if (cuentas.length === 0) {
    return res.status(400).json({ message: "Este cliente no tiene cuentas" });
  }
  return res.status(200).json(cuentas);
};
const getCuentaById = async (req, res) => {
  if (!req.params.idcliente || !req.params.idcuenta) {
    return res
      .status(400)
      .json({ message: "No existen los parametros de busqueda" });
  }
  const { idcliente, idcuenta } = req.params;

  const cuenta = await Cuenta.findOne({
    where: {
      id: idcuenta,
      cliente_id: idcliente,
    },
  });
  if (!cuenta) {
    return res.status(400).json({ message: "Error al consultar la cuenta" });
  }
  return res.status(200).json(cuenta);
};

module.exports = {
  getCuentasByClient,
  getCuentaById,
};
