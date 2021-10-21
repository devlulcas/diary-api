// ENVIRONMENT VARIABLES
require("dotenv/config");
const PORT = process.env.PORT || 3333;

// APP
const express = require("express");
const app = express();

// JSON MIDDLEWARE
app.use(express.json());

// CORS MIDDLEWARE
const cors = require("cors");
const acceptedOrigins = process.env.ORIGINS || "*";
app.use(
  cors({
    origin: acceptedOrigins,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

// COOKIES MIDDLEWARE
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// ROUTER MIDDLEWARE
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
