const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cliente = sequelize.define("cliente", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numero_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Cliente.associate = (models) => {
    Cliente.hasMany(models.Cuenta, {
      as: "Cuenta",
      foreignKey: "cliente_id",
    });
  };
  Cliente.associate = (models) => {
    Cliente.hasMany(models.Transferencia, {
      as: "Tranferencia",
      foreignKey: "cliente_id",
    });
  };
};
