const express = require("express");
const http = require("http");

const mongoose = require("mongoose");
const passport = require("passport");

const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

//MIDDILWARES
const app = express();
let server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/avatar", express.static("upload"));

const clothRoutes = require("./routes/clothRoutes");
const userRoutes = require("./routes/userRoutes");

//Passport Middleware
app.use(passport.initialize());

//Passport Config.
require("./config/passport")(passport);

app.use(morgan("dev"));

let _response = {};

//ROUTES

app.use("/api/cloth", clothRoutes);
app.use("/api/user", userRoutes);

//Catching 404 Error
app.use((req, res, next) => {
  const error = new Error("INVALID ROUTE");
  error.status = 404;
  next(error);
});

//Error handler function
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://abhishek:abhi@cluster0.v3qj8.mongodb.net/nirm?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Error in connecting to the database")
);

db.once("open", function () {
  console.log("Connected to the database!");
});
app.use("/", (req, res) => {
  res.status(200).json(_response);
});

server.listen(PORT, () => {
  _response.server = "Healthy";
});
