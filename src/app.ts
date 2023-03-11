import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

import router from './routes';
import { handleError } from './middlewares/handleError.middleware';

const app = express();

app.set('PORT', process.env.PORT || 3001);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use(
  fileUpload({
    tempFileDir: './tmp/',
    useTempFiles: true,
  }),
);

app.use('/api', router);

app.use(handleError);

export default app;
