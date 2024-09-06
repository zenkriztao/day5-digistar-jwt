"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const validators_1 = require("../handlers/validators/validators");
const userRouter = (userController) => {
    const router = (0, express_1.Router)();
    router.get('/', userController.getAllUsers);
    router.get('/:userId', validators_1.getUserValidator, userController.getUserById);
    router.post('/', validators_1.createUserValidator, userController.createUser);
    router.put('/:userId', validators_1.updateUserValidator, userController.updateUser);
    router.delete('/:userId', validators_1.deleteUserValidator, userController.deleteUser);
    router.post('/register', userController.register);
    router.post('/login', userController.login);
    return router;
};
exports.userRouter = userRouter;
