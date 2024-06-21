import { pool } from "../config/database.js";
// import CompanyController from "../controllers/CompanyController.js";
// import Company from "./Company.js";
import bcrypt from 'bcryptjs';

// Class user to define a User Model

class User {
  // Constructor with him properties.
  constructor(id, email, password, roleId) {
    (this.id = id), (this.email = email), (this.password = password), (this.roleId = roleId);
  }

  // Static method to create a new user
  static async create(connection ,email, password, roleId) {
    try {
      // Hashing the request password to save safe password.
      const hashedPassword = await bcrypt.hash(password, 10);
      // Query to insert new user in DB.
      const query = "INSERT INTO users (email,password, roleId) VALUES (?, ?, ?)";
      // Get the result of query in result var.
      // Pass the sql code and VALUES.
      const [result] = await connection.execute(query, [email, hashedPassword, roleId]);
      // Return the user created with his properties.
      return new User(result.insertId, email, hashedPassword, roleId);
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
