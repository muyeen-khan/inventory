import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import {
  MAX_JSON_SIZE,
  MONGODB_CONNECTION_STRING,
  PORT,
  REQUEST_LIMIT_NUMBER,
  REQUEST_LIMIT_TIME,
  URL_ENCODED,
  WEB_CACHE,
} from "./app/config/config.js";
import router from "./routes/api.js";

const app = express();

//global application middleware
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());

app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

//rate limiter
const limiter = rateLimit({
  windowMs: REQUEST_LIMIT_TIME,
  limit: REQUEST_LIMIT_NUMBER,
});
app.use(limiter);

// Web Caching
app.set("etag", WEB_CACHE);

// MongoDB connection
mongoose
  .connect(MONGODB_CONNECTION_STRING, { autoIndex: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });

//set API routes
app.use("/api", router);

//set application storage
app.use(express.static("uploads"));

//add react front end routing
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

//run express backend project
app.listen(PORT, () => {
  console.log(`app is running in ${PORT}`);
});
