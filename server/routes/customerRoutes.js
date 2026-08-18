import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import * as customerController from '../controllers/customerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { ownerOrAdminMiddleware } from '../middleware/ownerOrAdminMiddleware.js';

const router = Router();

// GET - /api/v1/customers (default page 1 limit 10) - get all customers - PRIVATE - Admin access only
router.get('/', authMiddleware, adminMiddleware, customerController.getAllCustomers);          // supports ?page=1&limit=10

// GET - /api/v1/customers/:id - get customer by ID - PRIVATE - Owner or Admin access only
router.get('/:id', authMiddleware, ownerOrAdminMiddleware, customerController.getCustomerById);

// PUT - /api/v1/customers/:id - update customer profile - PRIVATE - Owner or Admin access only
router.put('/:id', authMiddleware, ownerOrAdminMiddleware, customerController.updateCustomer);

// DELETE - /api/v1/customers/:id - delete customer by ID - PRIVATE - Admin access only
router.delete('/:id', authMiddleware, adminMiddleware, customerController.deleteCustomer);

export default router;