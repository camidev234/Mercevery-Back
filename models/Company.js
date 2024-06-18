import { pool } from "../config/database.js";

class Company {

  constructor(id, cn, n, p, e, pa, ui) {
    this.id = id
    this.company_name = cn,
    this.nit = n,
    this.phone_number = p,
    this.email = e,
    this.principal_acvitivy = pa,
    this.user_id = ui
  }

  static create = async (cmp_name, nit, phone, email, prn_act, user_id) => {
    try {
      const query =
        "INSERT INTO companies (company_name, nit, phone_number, email, principal_activity, user_id) VALUES (?, ?, ?, ?, ?, ?)";
      const [result] = await pool.execute(query, [cmp_name, nit, phone, email, prn_act, user_id]);
      return new Company(result.insertId, cmp_name, nit, phone, email, prn_act, user_id);   
    } catch (error) {
        console.log('An error ocurred: ', error.sqlMessage);
        throw error;
      }
  };
}

export default Company;
