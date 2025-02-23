import express from 'express';
import config from './config/config.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', routes);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
