import express, { Application } from 'express';
import cors from 'cors';
import moviesRouter from './app/modules/movies/user.route';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/movies', moviesRouter.router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

export default app;
