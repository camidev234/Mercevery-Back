import { pool } from "../config/database.js";
import Client from "../models/Client.js";
import Company from "../models/Company.js";
import User from "../models/User.js";

class UserController {
  static createUser = async (req, res) => {
    const connection = await pool.getConnection();
    const { email, password, roleId } = req.body;
    try {
      await connection.beginTransaction();
      const newUser = await User.create(connection, email, password, roleId);
      const userResponse = { ...newUser };
      delete userResponse.password;
      if (req.body.roleId === 1) {
        const newCompany = await Company.create(
          connection,
          req.body.company_name,
          req.body.nit,
          req.body.phone_number,
          req.body.email,
          req.body.principal_activity,
          newUser.id
        );
        await connection.commit();
        res.status(201).json({
          user_created: userResponse,
          company_created: newCompany,
        });
      } else {
        const newClient = await Client.create(
          connection,
          req.body.name,
          req.body.last_name,
          req.body.number_document,
          newUser.id
        );
        await connection.commit();
        res.status(201).json({
          user_created: userResponse,
          client_created: newClient,
        });
      }
    } catch (error) {
      await connection.rollback();
      const errorMessage = error.sqlMessage || "Error al crear el usuario";
      console.log(error);
      if (error.code === "ER_DUP_ENTRY") {
        res.status(409).json({
          message: "User exists",
          errorMessage,
          error_code: 409,
        });
      } else {
        res.status(500).json({
          message: "Error al crear el usuario",
          errorMessage,
          error_code: 500,
        });
      }
    }
  };

  static getUserById = async (req, res) => {
    try {
      const user = await User.find(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      const errorMessage =
        error.sqlMessage || error.message || "Error al buscar el usuario";
      res.status(500).json({
        message: errorMessage,
      });
    }
  };
}

export default UserController;
