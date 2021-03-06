const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../routes/auth/auth-router");
const userRouter = require("../routes/users/user-router");
const expenseRouter = require("../routes/expenses/expense-router");
const incomeRouter = require("../routes/income/income-router");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/expenses", expenseRouter);
server.use("/api/income", incomeRouter);

server.get("/", (req, res) => {
  res.status(200).json({message:"it's alive! Let's track these expenses!"});
});

module.exports = server;
