import { Request, Response, NextFunction } from 'express';
import { UserUseCase } from '../../domain/usecases/usecases';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../domain/models/models';

export class UserController {
  private userUseCase: UserUseCase;

  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userUseCase.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userUseCase.getUserById(req.params.userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.userUseCase.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.userUseCase.updateUser(req.params.userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userUseCase.deleteUser(req.params.userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).send('User registered');
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async login(req: Request, res: Response): Promise<void> {
    try {
        const { name, password } = req.body;
        const user = await UserModel.findOne({ name });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).send('Invalid credentials');
            return; 
        }
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
        return; 
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        return; 
    }
}

}