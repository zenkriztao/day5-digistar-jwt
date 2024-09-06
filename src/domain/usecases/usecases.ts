import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User } from '../../core/types';
import { NotFoundError, ValidationError } from '../../core/errors/customErrors';
import { UserRepository } from '../repositories/repositories';

export class UserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    if (!userData.name) {
      throw new ValidationError('Name is required');
    }
    if (!userData.email) {
      throw new ValidationError('Email is required');
    }

    // Ensure a password is always hashed, whether provided or generated
    const passwordToHash = userData.password || uuidv4();
    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    const newUser: User = {
      userId: uuidv4(),
      email: userData.email,
      name: userData.name,
      password: hashedPassword // Use the hashed password
    };
  
    return this.userRepository.create(newUser);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const updatedUser = await this.userRepository.update(userId, userData);
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const deleted = await this.userRepository.delete(userId);
    if (!deleted) {
      throw new NotFoundError('User not found');
    }
  }
}
