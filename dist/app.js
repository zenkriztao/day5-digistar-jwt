"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./core/config/database");
const middlewares_1 = require("./core/middlewares/middlewares");
const userRoutes_1 = require("./routes/userRoutes");
const repositories_1 = require("./domain/repositories/repositories");
const usecases_1 = require("./domain/usecases/usecases");
const controllers_1 = require("./handlers/controllers/controllers");
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
// Database connection
(0, database_1.connectDatabase)();
// Setup dependencies
const userRepository = new repositories_1.UserRepository();
const userUseCase = new usecases_1.UserUseCase(userRepository);
const userController = new controllers_1.UserController(userUseCase);
// Routes
app.use('/api/users', (0, userRoutes_1.userRouter)(userController));
// Error handling middleware
app.use(middlewares_1.errorMiddleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
