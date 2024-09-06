import { Request, Response, NextFunction } from 'express';
import { NotFoundError, ValidationError } from '../errors/customErrors';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};

// export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//   const token = req.headers.authorization?.split(' ')[1];
//   const decoded = verifyToken(token);
//   if (!decoded) {
//     res.status(401).json({ error: 'Unauthorized access' });
//     return;
//   }
//   req.user = decoded as jwt.JwtPayload;  // Casting to JwtPayload for type safety
//   next();
// };