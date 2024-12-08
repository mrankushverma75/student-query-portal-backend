import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Name should be a string.',
        'string.empty': 'Name cannot be empty.',
        'string.min': 'Name should be at least 3 characters.',
        'string.max': 'Name should not exceed 50 characters.',
        'any.required': 'Name is required.',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a string.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.',
    }),
    role: Joi.string().valid('Admin','Student', 'Resolver').required().messages({
        'string.base': 'Role should be a string.',
        'any.only': 'Role must be one of Admin, Editor, or Viewer.',
        'any.required': 'Role is required.',
    }),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])'))
        .required()
        .messages({
            'string.empty': 'Password cannot be empty.',
            'string.min': 'Password should be at least 8 characters.',
            'string.max': 'Password should not exceed 30 characters.',
            'string.pattern.base':
                'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'any.required': 'Password is required.',
        }),
});