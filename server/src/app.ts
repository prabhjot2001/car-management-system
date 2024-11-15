import express from 'express';
import authRoutes from './routes/authRoutes';
import carRoutes from './routes/carRoutes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/cars', carRoutes);

export default app;
