import Joi from 'joi';

export const submitQuerySchema = Joi.object({
    title: Joi.string().min(5).max(100).required().messages({
        'string.base': 'Title should be a string.',
        'string.empty': 'Title cannot be empty.',
        'string.min': 'Title should be at least 5 characters.',
        'string.max': 'Title should not exceed 100 characters.',
        'any.required': 'Title is required.',
    }),
    description: Joi.string().min(10).required().messages({
        'string.base': 'Description should be a string.',
        'string.empty': 'Description cannot be empty.',
        'string.min': 'Description should be at least 10 characters.',
        'any.required': 'Description is required.',
    }),
    file: Joi.string().optional().messages({
        'string.base': 'Attachments should be a string (file path or URL).',
    }),
});
