import User from "../models/User.js";

class UserController {
  static createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const newUser = await User.create(email, password);
      res.status(201).json({
        user_created: newUser,
      });
    } catch (error) {
      const errorMessage = error.sqlMessage || "Error al crear el usuario";
      res.status(500).json({
        message: "Error to create a user: ",
        errorMessage,
      });
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
