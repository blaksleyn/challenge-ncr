const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cuenta = sequelize.define("cuenta", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    numero_cuenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    tipo_cuenta: {
      type: DataTypes.ENUM("cuenta corriente", "caja de ahorro"),
      allowNull: false,
      defaultValue: "cuenta corriente",
    },
    saldo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Cuenta.associate = (models) => {
    Cuenta.belongsTo(models.Cliente, {
      as: "Cliente",
      foreignKey: "cliente_id",
    });
    Cuenta.hasMany(models.Transferencia, {
      as: "Transferencia",
      foreignKey: "cuenta_id",
    });
  };
};
