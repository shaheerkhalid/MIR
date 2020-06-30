require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require("./Api/User/user.router")

app.use(express.json());

app.use("/Api/User", userRouter);

//PORT
const port = process.env.APP_PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}`));