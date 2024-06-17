import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mercevery_db",
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connection successfully");
    connection.release();
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

export { pool, testConnection };
