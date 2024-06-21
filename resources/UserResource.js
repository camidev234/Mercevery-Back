import { pool } from "../config/database.js";
import Role from "../models/Role.js";

class UserResource {
  static user = async (userToConvert) => {
    try {
      console.log(userToConvert);
      const roleUser = await Role.find(userToConvert.roleId);
      let additional_information = {};
      if(roleUser.id === 1) {
        const query = "SELECT * FROM companies WHERE user_id = ?";
        const [rows] = await pool.query(query, [userToConvert.id]);
        if(rows.length > 0) {
          additional_information = rows[0];
        } else {
          throw new Error("This user has not associated company");
        }
      } else {
        const query = "SELECT * FROM clients WHERE user_id = ?";
        const [rows] = await pool.query(query, [userToConvert.id]);
        if(rows.length > 0) {
          additional_information = rows[0];
        } else {
          throw new Error("This user has not associated client");
        }
      }
      const userToReturn = {
        id: userToConvert.id,
        email: userToConvert.email,
        role: {
          id: roleUser.id,
          role_name: roleUser.role_name,
        },
        additional_information,
      };
      return userToReturn;
    } catch (error) {
      const errorMessage = error.sqlMessage || "Error to get role";
      console.log(errorMessage);
    }
  };
}

export default UserResource;
