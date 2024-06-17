import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Role = sequelize.define(
  "Role",
  {
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
  }
);

Role.hasMany(User, { foreignKey: "roleId" });

export default Role;
