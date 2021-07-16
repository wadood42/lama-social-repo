const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./configs/.env" });

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => console.log("error connecting to MongoDB", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// ROUTES FOR USER
app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);