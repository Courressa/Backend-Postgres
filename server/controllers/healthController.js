import { checkDatabase } from '../repos/healthRepo.js';

export const getHealth = async (req, res) => {
    try {
        const dbStatus = await checkDatabase();

        res.status(200).json({
        status: 'ok',
        message: 'Server is healthy',
        database: {
            connected: true,
            currentTime: dbStatus.current_time
        }
        });
    } catch (error) {
        console.error('Health check failed:', error.message);

        res.status(500).json({
        status: 'error',
        message: 'Database connection failed',
        error: error.message
        });
    }
};