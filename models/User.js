import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Role from "./Role.js";
import Company from "./Company.js";

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.belongsTo(Role, { foreignKey: "roleId" });
User.hasMany(Company, { foreignKey: "user_id" });

export default User;
