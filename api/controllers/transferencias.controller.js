const { Transferencia, Cuenta } = require("../Db/index");

const getTransferencia = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "No existe parametro de busqueda" });
  }
  const { id } = req.params;

  const transferencias = await Transferencia.findAll({
    where: {
      cliente_id: id,
    },
  });
  if (!transferencias) {
    return res.status(400).json({
      message: "No existe este cliente.",
    });
  }
  if (transferencias.length === 0) {
    return res.status(400).json({
      message: "Este cliente no tiene transferencias",
    });
  }
  return res.status(200).json(transferencias);
};

const postTransferencia = async (req, res) => {
  const { id } = req.params;
  const { monto, cuenta_destino } = req.body;
  if (monto <= 0) {
    return res.status(403).json({ message: "El monto debe ser mayor a cero" });
  }
  const cuenta = await Cuenta.findOne({
    where: {
      id: id,
    },
  });
  if (!cuenta) {
    return res.status(400).json({ message: "Esta cuenta no existe" });
  }
  if (cuenta.dataValues.saldo < monto) {
    return res.status(403).json({
      message:
        "La transferencia no se pudo realizar, ya que el monto supera el saldo en su cuenta",
    });
  }
  const cuentaVerdadera = await Cuenta.findOne({
    where: {
      numero_cuenta: cuenta_destino,
    },
  });
  if (cuentaVerdadera.dataValues.id === cuenta.dataValues.id) {
    return res
      .status(403)
      .json({ message: "No se puede transferir dinero a la misma cuenta" });
  }

  if (cuentaVerdadera) {
    const nuevaTransferencia = await Transferencia.create({
      monto,
      cuenta_destino,
      cuenta_id: id,
      cliente_id: cuentaVerdadera.dataValues.cliente_id,
      cuenta_origen: cuenta.dataValues.numero_cuenta,
    });
    if (nuevaTransferencia) {
      const saldoNuevo = await Cuenta.update(
        {
          saldo: monto + cuentaVerdadera.dataValues.saldo,
        },
        {
          where: {
            numero_cuenta: cuenta_destino,
          },
        }
      );
      const saldoCuentaOrigen = await Cuenta.update(
        {
          saldo: cuenta.dataValues.saldo - monto,
        },
        {
          where: {
            id: id,
          },
        }
      );

      if (saldoNuevo && saldoCuentaOrigen) {
        return res
          .status(200)
          .json({ message: "Transferencia creada", data: nuevaTransferencia });
      }
      return res.status(400).json({
        message: "Transferencia fallida.No pudimos actualizar el saldo",
      });
    } else {
      return res.status(400).json({ message: "Transferencia fallida." });
    }
  } else {
    return res
      .status(400)
      .json({ message: "La cuenta a la que quiere enviar dinero no existe" });
  }
};
module.exports = {
  getTransferencia,
  postTransferencia,
};
