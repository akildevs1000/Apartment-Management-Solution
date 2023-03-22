"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tennant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.tennant.belongsTo(models.floor, {
        foreignKey: "floor_id",
      });

      models.tennant.belongsTo(models.flat, {
        foreignKey: "flat_id",
      });
    }
  }
  Tennant.init(
    {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female", "other"),
      tel: DataTypes.STRING,
      mobile: DataTypes.STRING,
      from: DataTypes.STRING,
      to: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tennant",
    }
  );
  return Tennant;
};
