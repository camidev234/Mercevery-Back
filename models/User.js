import { pool } from "../config/database.js";

class User {
  constructor(id, email, password) {
    this.id = id, 
    this.email = email,
    this.password = password;
  }

  static async create (email, password) {
    try {
      const query = "INSERT INTO users (email,password) VALUES (?, ?)";
      const [result] = await pool.query(query, [email, password]);
      return new User(result.insertId, email, password);
    } catch (error) {
      console.log("An error ocurred: ", error.sqlMessage);
      throw error;
    }
  };
}

export default User;
