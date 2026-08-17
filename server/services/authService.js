import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as customerRepo from '../repos/customerRepo.js';
import * as adminRepo from '../repos/adminRepo.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d'; // 1 day
const SALT_ROUNDS = 10;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

//////////////////////
// CUSTOMER AUTH
//////////////////////

export const registerCustomer = async ({ email, password, first_name, last_name }) => {
    const existing = await customerRepo.findCustomerByEmail(email);
    if (existing) {
        throw new Error('Email already registered');
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    const customer = await customerRepo.createCustomer({
        email,
        password_hash,
        first_name,
        last_name
    });

    return {
        message: 'Registration successful. Please log in.',
        customer: {
        id: customer.id,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name
        }
    };
};

export const loginCustomer = async ({ email, password }) => {
    const customer = await customerRepo.findCustomerByEmail(email);
    if (!customer) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, customer.password_hash);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken({
        id: customer.id,
        type: 'customer'
    });

    // Remove password_hash before returning
    const { password_hash, ...safeCustomer } = customer;

    return { customer: safeCustomer, token };
};

//////////////////////
// ADMIN AUTH
//////////////////////

export const loginAdmin = async ({ email, password }) => {
    const admin = await adminRepo.findAdminByEmail(email);
    if (!admin) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken({
        id: admin.id,
        type: 'admin',
        role: admin.role
    });

    const { password_hash, ...safeAdmin } = admin;

    return { admin: safeAdmin, token };
};