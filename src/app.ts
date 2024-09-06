import express from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from './core/config/database';
import { errorMiddleware } from './core/middlewares/middlewares';
import { userRouter } from './routes/userRoutes';
import { UserRepository } from './domain/repositories/repositories';
import { UserUseCase } from './domain/usecases/usecases';
import { UserController } from './handlers/controllers/controllers';

const app = express();

// Middleware
app.use(bodyParser.json());

// Database connection
connectDatabase();

// Setup dependencies
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

// Routes
app.use('/api/users', userRouter(userController));

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
