const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Transferencia = sequelize.define("transferencia", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    numero_transferencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    monto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cuenta_destino: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cuenta_origen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  (Transferencia.associate = (models) => {
    Transferencia.belongsTo(models.Cliente, {
      as: "Cliente",
      foreignKey: "cliente_id",
    });
  }),
    (Transferencia.associate = (models) => {
      Transferencia.belongsTo(models.Cuenta, {
        as: "Cuenta",
        foreignKey: "cuenta_id",
      });
    });
};
