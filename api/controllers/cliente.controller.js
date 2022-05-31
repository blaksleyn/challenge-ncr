const { Cliente } = require("../Db/index");
const getClientes = async (req, res) => {
  const clientes = await Cliente.findAll();
  if (!clientes || clientes.length === 0) {
    return res.status(400).json({ message: "No se encontraron clientes" });
  }
  return res.status(200).json(clientes);
};

module.exports = {
  getClientes,
};
