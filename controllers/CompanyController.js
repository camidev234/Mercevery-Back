import Company from "../models/Company.js";

class CompanyController {
  static createCompany = async (req, res) => {
    const {
      company_name,
      nit,
      phone_number,
      email,
      principal_activity,
      user_id,
    } = req.body;
    try {
      const newCompany = await Company.create(
        company_name,
        nit,
        phone_number,
        email,
        principal_activity,
        user_id
      );
      console.log(newCompany);
      res.status(201).json({
        company_created: newCompany,
      });
    } catch (error) {
      const errorMessage = error.sqlMessage || error.error || "Error to create company";
      res.status(500).json({
        message: errorMessage,
      });
    }
  };
}

export default CompanyController;
