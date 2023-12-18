import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/golbalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());
// app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1', router);

const getAController = async (req: Request, res: Response) => {
  // Promise.reject();
  res.send('first app running');
};
app.get('/', getAController);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
