import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../core/types';

// Interface for the decoded JWT payload
interface DecodedToken {
  userId: string;
  name: string;
  iat: number;
  exp: number;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Function to generate JWT token
export const generateToken = (user: User): string => {
  const payload = {
    userId: user.userId,
    name: user.name
  };
  const options: SignOptions = { expiresIn: '1h' };
  return jwt.sign(payload, JWT_SECRET, options);
};

// Middleware to verify JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];  
  
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token expired!' });
      }
      return res.status(401).send({ message: 'Unauthorized!' });
    }
  
    next();
  });
};

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
