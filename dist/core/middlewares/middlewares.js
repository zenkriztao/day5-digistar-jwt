"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const customErrors_1 = require("../errors/customErrors");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof customErrors_1.NotFoundError) {
        return res.status(404).json({ error: err.message });
    }
    if (err instanceof customErrors_1.ValidationError) {
        return res.status(400).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
};
exports.errorMiddleware = errorMiddleware;
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
