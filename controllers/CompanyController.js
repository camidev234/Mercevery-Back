import Company from "../models/Company.js";


class CompanyController {
    static createCompany = async (req, res) => {
        const { company_name, nit, phone_number, email, principal_activity, user_id } = req.body;
        try {
            const newCompany = Company.create(company_name, nit, phone_number, email, principal_activity, user_id);
            res.status(201).json({
                company_created: newCompany
            });
        } catch (error) {
           const errorMessage = error.sqlMessage || "Error to create company";
           res.status().json({
            message: errorMessage 
           });
        }
    }
}

export default CompanyController;