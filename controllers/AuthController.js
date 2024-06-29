import { pool } from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserResource from "../resources/UserResource.js";
dotenv.config();

class AuthController {
  static authUser = async (req, res) => {
    // Destructuring the request body.
    const { email, password } = req.body;
    try {
      // Query to get the user passed in request
      const query = "SELECT * FROM users WHERE email = ?";
      // Execute the query
      const [rows] = await pool.query(query, [email]);
      // The user find wll be the first element found
      const userFind = rows[0];
      // If that user not found
      if (!userFind) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Else, validate the password compare the password passed in the request hash and query user hash
      const validPassword = await bcrypt.compare(password, userFind.password);
      // if the passwords are not the same
      if (!validPassword) {
        return res.status(401).json({
          message: "Incorrect password, check your credentials",
        });
      }

      // Else, create a token
      // Receive the user id, the secret key and the expiration
      const token = jwt.sign({ id: userFind.id }, "mysecretkey123", {
        expiresIn: "1h",
      });

      // Return the userfind 
      const userToReturn = await UserResource.user(userFind);

      // console.log(userToReturn);

      // Response in JSON the user auth and access token
      res.status(200).json({
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
