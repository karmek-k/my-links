import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { auth } from './middleware/auth';
import passport from 'passport';
import localStrategy from './auth/localStrategy';
dotenv.config();

import UserRouter from './routes/user';

const port = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
passport.use(localStrategy);
app.use(passport.initialize());

// Routes
app.use('/user', UserRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
