"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../domain/models/models");
class UserController {
    constructor(userUseCase) {
        this.getAllUsers = async (req, res, next) => {
            try {
                const users = await this.userUseCase.getAllUsers();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                const user = await this.userUseCase.getUserById(req.params.userId);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.createUser = async (req, res, next) => {
            try {
                const newUser = await this.userUseCase.createUser(req.body);
                res.status(201).json(newUser);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            try {
                const updatedUser = await this.userUseCase.updateUser(req.params.userId, req.body);
                res.json(updatedUser);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                await this.userUseCase.deleteUser(req.params.userId);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.userUseCase = userUseCase;
    }
    async register(req, res) {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const newUser = new models_1.UserModel({ username, password: hashedPassword });
            await newUser.save();
            res.status(201).send('User registered');
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async login(req, res) {
        try {
            const { name, password } = req.body;
            const user = await models_1.UserModel.findOne({ name });
            if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
                res.status(401).send('Invalid credentials');
                return;
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
            return;
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }
}
exports.UserController = UserController;
