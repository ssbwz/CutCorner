import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRoutes from './src/routes/users-routes';

dotenv.config({ path: __dirname + '/config.env' });

const app: Express = express();

app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${req.method} ${req.url}`);
  next();
});

// routes
app.use('/users', userRoutes);

app.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
