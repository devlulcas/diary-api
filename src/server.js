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
const whisperRouter = require("./routes/whisperRoutes");
const configRouter = require("./routes/configRoutes");

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/diary", diaryRouter);
app.use("/whisper", whisperRouter);
app.use("/config", configRouter);

// ERROR MIDDLEWARE
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

// RUN
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
