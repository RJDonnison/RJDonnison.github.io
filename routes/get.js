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

  admin = true;

  //Read projects data
  let webData = JSON.parse(fs.readFileSync("data.json"));

  //Break down of data
  let header = webData.header;
  let headerSub = webData.headerSub;
  let about = webData.about;
  let projects = webData.projects;
  let projectsEnd = webData.projectsEnd;
  let contact = webData.contact;

  res.render("index", {
    header: header,
    headerSub: headerSub,
    about: about,
    projects: projects,
    projectsEnd: projectsEnd,
    contact: contact,
    admin: admin,
  });
});
//#endregion

//*Display admin page
//#region
router.get("/admin", (req, res) => {
  res.render("admin");
});
//#endregion

module.exports = router;
