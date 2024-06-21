// import { pool } from "../config/database";

class Client {
  constructor(id, name, last_name, number_document, user_id) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.number_document = number_document;
    this.user_id = user_id;
  }

  static create = async (connection, name, last_name, number_document, user_id) => {
    try {
      const query =
        "INSERT INTO clients (name, last_name, number_document, user_id) VALUES (?, ?, ?, ?)";
      const [result] = await connection.execute(query, [name, last_name, number_document, user_id]);
      return new Client(result.insertId, name, last_name, number_document, user_id);
    } catch (error) {
      console.log("An error ocurred: ", error);
      throw error;
    }
  };
}

export default Client;
