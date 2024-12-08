import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi, { ObjectSchema } from 'joi';


export const validate = (schema: ObjectSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            res.status(400).json({ errors });
            return;
        }

        next();
    };
};
