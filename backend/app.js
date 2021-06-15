const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const classRoutes  = require("./routes/class")
const labelRoutes = require("./routes/label")
const studentLevelZeroRoutes = require("./routes/student_level_0")
const studentLevelFirstRoutes = require("./routes/student_level_1")
const studentLevelTwoRoutes = require("./routes/student_level_2")
const specialDayRoutes = require("./routes/special_days")
const accountRoutes = require("./routes/account")

const app = express();

mongoose
  .connect(
    "mongodb+srv://Trung:CsCJzKHR1eCp48lb@cluster0.nhi8c.mongodb.net/Gemmy?retryWrites=true&w=majority"
  )
//   .connect(
//     "mongodb://127.0.0.1:27017/Gemmy"
//   )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

app.use("/api/user", userRoutes);

app.use("/api/class", classRoutes);

app.use("/api/class-status", classRoutes );

app.use("/api/label", labelRoutes);

app.use("/api/student-level-0", studentLevelZeroRoutes);

app.use("/api/student-level-1", studentLevelFirstRoutes);

app.use("/api/student-level-2",
studentLevelTwoRoutes);

app.use("/api/special-days", specialDayRoutes);

app.use("/api/account", accountRoutes);

module.exports = app;
