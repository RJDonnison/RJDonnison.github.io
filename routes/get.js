//Import express
const express = require("express");
const router = express.Router();

//Import fs
const fs = require("fs");

//*Display portfolio
//#region
router.get("/", (req, res) => {
  //Read projects data
  let rawdata = fs.readFileSync("projects.json");
  let projects = JSON.parse(rawdata).projects;

  res.render("index", { projects: projects });
});
//#endregion

//*Display admin page
//#region
router.get("/admin", (req, res) => {
  res.render("admin");
});
//#endregion

module.exports = router;
