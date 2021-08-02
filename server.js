
const express = require("express");
const mongoose = require("mongoose");
const User = require("./Model/User");
const app = express();
require("dotenv").config();
app.use(express.json());
// DB connection

const dbConnect = require("./config/connectDB");
const cors = require('cors');
app.use(cors());
dbConnect();
const PORT = 5000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("server is running")
);

//   Routes
// GET :  RETURN ALL USERS
app.get("/users", (req, res) => {
  User.find((err, data) => {
    if (err) console.log(err);
    res.status(200).json({
      status: "success",
      data: { users: data },
    });
  });
});
//  POST :  ADD A NEW USER TO THE DATABASE
app.post("/users", (req, res) => {
  console.log(req.body);
  const newUser = User.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      users: newUser,
    },
  });
});
// PUT : EDIT A USER BY ID
app.put("/users", (req, res) => {
  User.findByIdAndUpdate("60eb13551bae781eb09c53c2", req.body, (err, data) => {
    if (err) console.log(err);
    res.status(200).json({
      status: "success",
      data: { user: data },
    });
  });
});
// DELETE : REMOVE A USER BY ID
app.delete("/users", (req, res) => {
  User.findByIdAndDelete("60eb11701d4ee33a6062a588", (err, data) => {
    if (err) console.log(err);
    res.status(204).json({
      status: "success",
      data: { user: data },
    });
  });
});
//start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});