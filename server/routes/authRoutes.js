import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const router = Router();

// POST - /api/v1/auth/customer/register - register customer - PUBLIC
router.post('/customer/register', authController.registerCustomer);

// POST - /api/v1/auth/customer/login - login customer - PUBLIC
router.post('/customer/login', authController.loginCustomer);

// POST - /api/v1/auth/admin/login  - admin customer - PUBLIC
router.post('/admin/login', authController.loginAdmin);

export default router;