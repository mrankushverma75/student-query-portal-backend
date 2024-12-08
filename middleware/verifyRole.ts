import { Request, Response, NextFunction, RequestHandler } from 'express';

// Middleware to verify roles
export const verifyRole = (allowedRoles: string[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
            return;
        }

        next();
    };
};
