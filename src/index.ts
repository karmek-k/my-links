import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import UserRouter from './routes/user';

const port = process.env.PORT || 8000;
const app = express();

app.use('/user', UserRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
