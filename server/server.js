const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

// IMPORT DATABASE
require("./db");

const app = express();

app.use(cors());
app.use(express.json());



// TEST ROUTE

app.get("/", (req, res) => {
  res.send("Server Running");
});



// AUTH ROUTES

app.use("/", authRoutes);



// START SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});