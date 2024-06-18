import { pool } from "../config/database.js";

class Role {

  constructor(id, role_name) {
    this.id = id;
    this.role_name = role_name
  }

  static find = async (id) => {
    try {
      const query = "SELECT * FROM roles WHERE id = ?";
      const [rows] = await pool.query(query, [id]);
      console.log(rows);
      if(rows.length > 0) {
        const role = rows[0];
        return new Role(role.id, role.role_name);
      }
      throw new Error('Role not found');
    } catch (error) {
      console.log('An error ocurred: ', error);
      throw error;
    }
  }
}

export default Role;
