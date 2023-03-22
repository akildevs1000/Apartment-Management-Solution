"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class flat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.flat.belongsTo(models.floor, {
        foreignKey: "floor_id",
      });
    }
  }

  flat.init(
    {
      flat_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "flat",
    }
  );
  return flat;
};
