import { pool } from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserResource from "../resources/UserResource.js";
dotenv.config();

class AuthController {
  static authUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const query = "SELECT * FROM users WHERE email = ?";
      const [rows] = await pool.query(query, [email]);
      const userFind = rows[0];
      if (!userFind) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const validPassword = await bcrypt.compare(password, userFind.password);
      if (!validPassword) {
        return res.status(401).json({
          message: "Incorrect password, check your credentials",
        });
      }

      const token = jwt.sign({ id: userFind.id }, "mysecretkey123", {
        expiresIn: "1h",
      });

      const userToReturn = await UserResource.user(userFind);

      console.log(userToReturn);

      res.json({
        access_token: token,
        user: userToReturn,
      });
    } catch (error) {
      console.error("Login Error:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };
}

export default AuthController;
