const cliente = require("../dataDb/cliente.json");
const cuentas = require("../dataDb/cuenta.json");
const transferencias = require("../dataDb/transferencias.json");
const { Cliente, Cuenta, Transferencia } = require("../Db/index");

module.exports = async () => {
  console.log("Inicializando DDBB..."); // eslint-disable-line no-console

  try {
    await Cliente.bulkCreate(cliente, {
      validate: true,
    });
    console.log("- cliente cargado en la DDBB"); // eslint-disable-line no-console
  } catch (err) {
    console.log(`Tipo de error: ${err}`); // eslint-disable-line no-console
    console.log("No se han podido cargar el cliente"); // eslint-disable-line no-console
  }
  try {
    await Cuenta.bulkCreate(cuentas, {
      validate: true,
    });
    console.log("-cuentas cargado en la DDBB"); // eslint-disable-line no-console
  } catch (err) {
    console.log(`Tipo de error: ${err}`); // eslint-disable-line no-console
    console.log("No se han podido cargar las cuentas"); // eslint-disable-line no-console
  }
  try {
    await Transferencia.bulkCreate(transferencias, {
      validate: true,
    });
    console.log("- transgerencias cargadas en la DDBB"); // eslint-disable-line no-console
  } catch (err) {
    console.log(`Tipo de error: ${err}`); // eslint-disable-line no-console
    console.log("No se han podido cargar las transferencias"); // eslint-disable-line no-console
  }
};
