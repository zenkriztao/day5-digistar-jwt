import { User } from '../../core/types';
import { UserModel } from '../models/models';

export class UserRepository {
  async findAll(): Promise<User[]> {
    return UserModel.find().exec();
  }

  async findById(userId: string): Promise<User | null> {
    return UserModel.findOne({ userId }).exec();
  }
  async create(user: User): Promise<User> {
    const newUser = new UserModel(user);
    return newUser.save();
  }

  async update(userId: string, userData: Partial<User>): Promise<User | null> {
    return UserModel.findOneAndUpdate({ userId }, userData, { new: true }).exec();
  }

  async delete(userId: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ userId }).exec();
    return result.deletedCount === 1;
  }
}