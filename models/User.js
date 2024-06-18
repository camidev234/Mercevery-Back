import { pool } from "../config/database.js";
// import CompanyController from "../controllers/CompanyController.js";
// import Company from "./Company.js";

class User {
  constructor(id, email, password, roleId) {
    (this.id = id), (this.email = email), (this.password = password), (this.roleId = roleId);
  }

  static async create(email, password, roleId) {
    try {
      const query = "INSERT INTO users (email,password, roleId) VALUES (?, ?, ?)";
      const [result] = await pool.query(query, [email, password, roleId]);
      return new User(result.insertId, email, password, roleId);
    } catch (error) {
      console.log("An error ocurred: ", error.sqlMessage);
      throw error;
    }
  }

  static async find(id) {
    try {
      const query = "SELECT * FROM users WHERE id = ?";
      const [rows] = await pool.query(query, [id]);
      if(rows.length > 0) {
        const { id, email, password } = rows[0];
        return new User(id, email, password);
      }
      throw new Error('User not found');
    } catch (error) {
      console.error("Error al buscar el usuario por ID:", error);
      throw error;
    }
  }
}

export default User;
