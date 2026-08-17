import * as customerService from '../services/customerService.js';

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