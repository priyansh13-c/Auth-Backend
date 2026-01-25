import express from "express";

const app = express();

app.use(express.json());

//route import
import userRouter from './routes/user.route.js'
app.use("/api/v1/users",userRouter);

//example route: http://localhost:4000/api/v1/users/register

export default app;