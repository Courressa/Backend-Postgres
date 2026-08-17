import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import * as customerController from '../controllers/customerController.js';

const router = Router();

// GET - /api/v1/customers (default page 1 limit 10) - get all customers - PRIVATE - Admin access only
router.get('/', customerController.getAllCustomers);          // supports ?page=1&limit=10

// GET - /api/v1/customers/:id - get customer by ID - PRIVATE - Owner or Admin access only
router.get('/:id', customerController.getCustomerById);

// PUT - /api/v1/customers/:id - update customer profile - PRIVATE - Owner or Admin access only
router.put('/:id', customerController.updateCustomer);

// DELETE - /api/v1/customers/:id - delete customer by ID - PRIVATE - Admin access only
router.delete('/:id', customerController.deleteCustomer);

export default router;