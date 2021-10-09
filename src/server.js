// ENVIRONMENT VARIABLES
require("dotenv/config");
const PORT = process.env.PORT || 3333;

// APP
const express = require("express");
const app = express();
app.use(express.json());

// ROUTES
const rootRouter = require("./routes/rootRoutes");
const userRouter = require("./routes/userRoutes");
const diaryRouter = require("./routes/diaryRoutes");
const configRouter = require("./routes/configRoutes");

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/diary", diaryRouter);
app.use("/config", configRouter);

// RUN
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
