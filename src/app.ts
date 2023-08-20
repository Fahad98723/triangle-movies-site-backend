import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //Application routes
// app.use('/api/v1/movies', MovieRoutes.router);
// app.use('/api/v1/series', SeriesRoutes.router);

app.use('/api/v1/', routes);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger');
// });

//Global error handler
app.use(globalErrorHandler);

export default app;
