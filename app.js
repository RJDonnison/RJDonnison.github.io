const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//*Setup static files
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//*Setup middleware
app.use(express.urlencoded());
app.use(express.json());

app.use(cors());

//*Routes
const projects = require("./routes/projects.js");
app.use("/projects", projects);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
