import Role from "../models/Role.js";

class UserResource {
  static user = async (userToConvert) => {
    try {
      console.log(userToConvert);
      const roleUser = await Role.find(userToConvert.roleId);
      const userToReturn = {
        id: userToConvert.id,
        email: userToConvert.email,
        role: {
          id: roleUser.id,
          role_name: roleUser.role_name,
        },
      };
      return userToReturn;
    } catch (error) {
      const errorMessage = error.sqlMessage || "Error to get role";
      console.log(errorMessage);
    }
  };
}

export default UserResource;
