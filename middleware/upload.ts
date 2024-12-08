import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); 
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

// File filter to validate uploads
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
    }
};

export const upload = multer({ storage, fileFilter });
