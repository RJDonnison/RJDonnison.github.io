//Import path
const path = require("path");

//Import fs
const fs = require("fs");

//Import dotenv
require("dotenv").config();

//Import express
const express = require("express");
const app = express();
const port =
  process.env.STATUS === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;

//Import projects data

let rawdata = fs.readFileSync("projects.json");
let projects = JSON.parse(rawdata).projects;

console.log(projects);

//Set static file location
app.use("/static", express.static(path.join(__dirname, "public")));

//Set view file location and type
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Display portfolio page at /
app.get("/", (req, res) => {
  res.render("index", { projects: projects });
});

//Make app live at port
app.listen(port, () => {
  console.log(
    `Portfolio app listening on port ${port} at http://localhost:${port}/`
  );
});
