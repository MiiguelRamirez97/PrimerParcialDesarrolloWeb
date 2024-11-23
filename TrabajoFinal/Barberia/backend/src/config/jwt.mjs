import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const generateSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

const JWT_SECRET = process.env.JWT_SECRET || generateSecret();

export default JWT_SECRET;