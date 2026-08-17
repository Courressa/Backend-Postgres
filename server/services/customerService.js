import * as customerRepo from '../repos/customerRepo.js';
import bcrypt from 'bcrypt';

export const getCustomerById = async (id) => {
  const customer = await customerRepo.findCustomerById(id);
  if (!customer) {
    throw new Error('Customer not found');
  }
  return customer;
};

export const getAllCustomers = async ({ page = 1, limit = 10 } = {}) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10)); // max 100 per page
  const offset = (pageNum - 1) * limitNum;

  const [customers, total] = await Promise.all([
    customerRepo.findAllCustomers({ limit: limitNum, offset }),
    customerRepo.countCustomers()
  ]);

  return {
    data: customers,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: pageNum * limitNum < total,
      hasPrevPage: pageNum > 1
    }
  };
};

export const updateCustomer = async (id, data) => {
  const updated = await customerRepo.updateCustomer(id, data);
  if (!updated) {
    throw new Error('Customer not found');
  }
  return updated;
};

export const deleteCustomer = async (id) => {
  const deleted = await customerRepo.deleteCustomer(id);
  if (!deleted) {
    throw new Error('Customer not found');
  }
  return { message: 'Customer deleted successfully' };
};