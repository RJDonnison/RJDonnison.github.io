//*Imports
//#region
//Import path
const path = require("path");

//Import fs
const fs = require("fs");

//Import multer
const multer = require("multer");

//Import dotenv
require("dotenv").config();

//Import express
const express = require("express");
const app = express();
const port =
  process.env.STATUS === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;
//#endregion

//*Setup middleware
//#region
//Json setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Multer init
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images"); //Where files get uploaded
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  onFileUploadStart: function (file) {
    console.log(file.originalname + " is starting ...");
  },
});

//Set static file location
app.use("/static", express.static(path.join(__dirname, "public")));

//Set view file location and type
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//#endregion

//*Display portfolio
//#region
app.get("/", (req, res) => {
  //Read projects data
  let rawdata = fs.readFileSync("projects.json");
  let projects = JSON.parse(rawdata).projects;

  res.render("index", { projects: projects });
});
//#endregion

//*Admin page
//#region
app.get("/admin", (req, res) => {
  res.render("admin");
});

//Admin page post
app.post("/admin", upload.single("image"), (req, res, next) => {
  res.json({ message: "Successfully uploaded files" });

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
  let rawdata = fs.readFileSync("projects.json");
  let projects = JSON.parse(rawdata);

  //Add new project to array
  projects.projects.push(project);

  //Projects data to JSON
  let data = JSON.stringify(projects);
  fs.writeFileSync("projects.json", data);

  res.sendFile(path.join(__dirname, "/projects.json"));
});
//#endregion

//*Make app live at port
//#region
app.listen(port, () => {
  console.log(
    `Portfolio app listening on port ${port} at http://localhost:${port}/`
  );
});
//#endregion
