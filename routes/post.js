//Import express
const express = require("express");
const router = express.Router();

//Import fs
const fs = require("fs");

//Import path
const path = require("path");

//Import multer
const multer = require("multer");

//Import bcrypt
const bcrypt = require("bcrypt");

//*Middle where init
//#region
//Multer init
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images")); //Where files get uploaded
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
//#endregion

//*Add project post
//#region
//Authenticate admin
router.post("/auth", upload.single(), async (req, res) => {
  //Check password
  if (req.body.password == null) return res.send("No password");
  if (await bcrypt.compare(req.body.password, process.env.PASSWORD)) {
    //Generate session key
    req.session.username = req.body.username;
    //redirect to unlocked main page
    res.redirect("/");
  } else return res.redirect("/admin");
});

router.post("/save", upload.single(), async (req, res) => {});

router.post("/add-project", upload.single("image"), async (req, res) => {
  //Check file submitted
  if (req.file != null) {
    //Get form data to object
    const project = {
      name: req.body.name,
      year: req.body.year,
      github_link: req.body.github_link,
      project_link: req.body.project_link,
      image: `/static/images/${req.file.filename}`,
      image_alt: req.body.image_alt,
      description: req.body.description,
    };

    //Read projects data
    let rawdata = fs.readFileSync("data.json");
    let projects = JSON.parse(rawdata);

    //Add new project to array
    projects.projects.push(project);

    //Sort projects array
    projects.projects.sort((a, b) => (a.year > b.year ? 1 : -1));

    //Projects data to JSON
    let data = JSON.stringify(projects);
    fs.writeFileSync("data.json", data);

    res.redirect("/");
  } else res.send("No file submitted");
});
//#endregion

module.exports = router;
