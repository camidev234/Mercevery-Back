import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Company = sequelize.define(
  "Company",
  {
    company_name: {
      tye: DataTypes.STRING,
      allowNull: false,
    },
    nit: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone_numer: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    principal_activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Company",
  }
);

Company.belongsTo(User, { foreignKey: "user_id" });

export default Company;
