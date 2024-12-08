import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Ensure JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable.');
}

// Export JWT_SECRET with a proper type
export const JWT_SECRET: string = process.env.JWT_SECRET;
export const JWT_EXPIRATION = '1h'; // Optional: Example for token expiration
