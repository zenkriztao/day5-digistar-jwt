"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const models_1 = require("../models/models");
class UserRepository {
    async findAll() {
        return models_1.UserModel.find().exec();
    }
    async findById(userId) {
        return models_1.UserModel.findOne({ userId }).exec();
    }
    async create(user) {
        const newUser = new models_1.UserModel(user);
        return newUser.save();
    }
    async update(userId, userData) {
        return models_1.UserModel.findOneAndUpdate({ userId }, userData, { new: true }).exec();
    }
    async delete(userId) {
        const result = await models_1.UserModel.deleteOne({ userId }).exec();
        return result.deletedCount === 1;
    }
}
exports.UserRepository = UserRepository;
