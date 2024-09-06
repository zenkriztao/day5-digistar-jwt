"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customErrors_1 = require("../../core/errors/customErrors");
class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        return this.userRepository.findAll();
    }
    async getUserById(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new customErrors_1.NotFoundError('User not found');
        }
        return user;
    }
    async createUser(userData) {
        if (!userData.name) {
            throw new customErrors_1.ValidationError('Name is required');
        }
        if (!userData.email) {
            throw new customErrors_1.ValidationError('Email is required');
        }
        // Ensure a password is always hashed, whether provided or generated
        const passwordToHash = userData.password || (0, uuid_1.v4)();
        const hashedPassword = await bcryptjs_1.default.hash(passwordToHash, 10);
        const newUser = {
            userId: (0, uuid_1.v4)(),
            email: userData.email,
            name: userData.name,
            password: hashedPassword // Use the hashed password
        };
        return this.userRepository.create(newUser);
    }
    async updateUser(userId, userData) {
        const updatedUser = await this.userRepository.update(userId, userData);
        if (!updatedUser) {
            throw new customErrors_1.NotFoundError('User not found');
        }
        return updatedUser;
    }
    async deleteUser(userId) {
        const deleted = await this.userRepository.delete(userId);
        if (!deleted) {
            throw new customErrors_1.NotFoundError('User not found');
        }
    }
}
exports.UserUseCase = UserUseCase;
