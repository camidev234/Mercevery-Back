import express from 'express';
import CompanyController from '../controllers/CompanyController.js';

const router = express.Router();

router.post('companies/save_company', CompanyController.createCompany);

export default router;