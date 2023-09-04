//Import express
const express = require("express");
const router = express.Router();

//Import fs
const fs = require("fs");

//*Display portfolio
//#region
router.get("/", (req, res) => {
  let admin = false;

  //Check username
  if (req.session.username == process.env.NAME) admin = true;

  //Read projects data
  let rawdata = fs.readFileSync("data.json");
  let projects = JSON.parse(rawdata).projects;

  res.render("index", { projects: projects, admin: admin });
});
//#endregion

//*Display admin page
//#region
router.get("/admin", (req, res) => {
  res.render("admin");
});
//#endregion

module.exports = router;
