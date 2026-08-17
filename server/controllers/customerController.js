import * as customerService from '../services/customerService.js';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createCustomer = async (req, res) => {
  try {
    let { email, password, first_name, last_name } = req.body;

    // Trim
    email = email?.trim();
    first_name = first_name?.trim();
    last_name = last_name?.trim();

    // Required fields
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }

    // Format checks
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email format'
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 8 characters and contain uppercase, lowercase, and a number'
      });
    }

    const customer = await customerService.createCustomer({
      email,
      password,
      first_name,
      last_name
    });

    res.status(201).json({
      status: 'success',
      data: customer
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: customer
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const { page, limit } = req.query; // ?page=2&limit=10

    const result = await customerService.getAllCustomers({ page, limit });

    res.status(200).json({
      status: 'success',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: customer
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const result = await customerService.deleteCustomer(req.params.id);
    res.status(200).json({
      status: 'success',
      message: result.message
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
};