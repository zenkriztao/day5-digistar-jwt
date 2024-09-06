import { body, param } from 'express-validator';

export const createUserValidator = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').optional().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const updateUserValidator = [
  param('userId').isUUID().withMessage('Invalid user ID'),
  body('name').optional().isString().notEmpty().withMessage('Name cannot be empty'),
  body('password').optional().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const getUserValidator = [
  param('userId').isUUID().withMessage('Invalid user ID')
];

export const deleteUserValidator = [
  param('userId').isUUID().withMessage('Invalid user ID')
];