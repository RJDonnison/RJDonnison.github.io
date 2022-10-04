const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

//*Setup static files
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//*Routes
const projects = require("./routes/projects.js");
app.use("/projects", projects);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
