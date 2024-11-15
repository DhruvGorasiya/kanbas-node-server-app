import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from 'cors';
import UserRoutes from "./Kanbas/Users/routes.js";


const app = express()
UserRoutes(app);
app.use(express.json());
app.use(cors());

Hello(app)
Lab5(app)
app.listen(process.env.PORT || 4000)