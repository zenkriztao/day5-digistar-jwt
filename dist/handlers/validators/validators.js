"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserValidator = exports.getUserValidator = exports.updateUserValidator = exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createUserValidator = [
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be valid'),
    (0, express_validator_1.body)('password').optional().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
exports.updateUserValidator = [
    (0, express_validator_1.param)('userId').isUUID().withMessage('Invalid user ID'),
    (0, express_validator_1.body)('name').optional().isString().notEmpty().withMessage('Name cannot be empty'),
    (0, express_validator_1.body)('password').optional().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
exports.getUserValidator = [
    (0, express_validator_1.param)('userId').isUUID().withMessage('Invalid user ID')
];
exports.deleteUserValidator = [
    (0, express_validator_1.param)('userId').isUUID().withMessage('Invalid user ID')
];
