const { join } = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  restaurantsRoutes,
  categoryRoutes,
  commentRoutes,
} = require("./routes");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
const pathToFile = join(__dirname, "./public");
app.use(express.json());
app.use(express.static(pathToFile));
//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use("/api/restaurants", restaurantsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/comments", commentRoutes);

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
