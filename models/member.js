"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.member.belongsTo(models.tennant, {
        foreignKey: "tennant_id",
      });
    }
  }
  member.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female", "other"),
      relation: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "member",
    }
  );
  return member;
};
