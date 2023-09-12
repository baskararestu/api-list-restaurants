const { join } = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { restaurantsRoutes } = require("./routes");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use("/api/restaurants", restaurantsRoutes);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
