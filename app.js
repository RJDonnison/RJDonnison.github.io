//Import path
const path = require("path");

//Import dotenv
require("dotenv").config();

//Import express
const express = require("express");
const app = express();
const port =
  process.env.STATUS === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;

//Set static file location
app.use("/static", express.static(path.join(__dirname, "public")));

//Set view file location and type
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Display page at /
app.get("/", (req, res) => {
  res.render("index");
});

//Make app live at port
app.listen(port, () => {
  console.log(
    `Portfolio app listening on port ${port} at http://localhost:${port}/`
  );
});