import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../repository/models/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/jwtConfig';

export const create = async (req: Request, res: Response): Promise<void> => {
    const { name, email, role, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'User already registered' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            role,
            password: hashedPassword,
            isActive: true,
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error('Error creating user:', error);
       
        res.status(500).json({ error: 'Failed to create user.' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        res.status(200).json({ token, message: 'Login successful.' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};
