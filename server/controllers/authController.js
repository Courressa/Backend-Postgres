import * as authService from '../services/authService.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const registerCustomer = async (req, res) => {
  try {
    let { email, password, first_name, last_name } = req.body;

    email = email?.trim();
    first_name = first_name?.trim();
    last_name = last_name?.trim();

    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ status: 'error', message: 'Invalid email format' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            status: 'error',
            message: 'Password must be at least 8 characters and contain uppercase, lowercase, and a number'
        });
    }

    const result = await authService.registerCustomer({
        email,
        password,
        first_name,
        last_name
    });

    res.status(201).json({
        status: 'success',
        data: result
    });
  } catch (error) {
    res.status(400).json({
        status: 'error',
        message: error.message
    });
  }
};

export const loginCustomer = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email?.trim();

        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        const result = await authService.loginCustomer({ email, password });

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: error.message
        });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email?.trim();

        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        const result = await authService.loginAdmin({ email, password });

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: error.message
        });
    }
};