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

//Import cors
const cors = require("cors");
app.use(cors());

//Import bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Import axios
const axios = require("axios");

//Get github data
//!Not returning data
const githubData = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
      },
    });

    if (response.status === 200) {
      return response;
    }
    return false;
  } catch (err) {
    return err;
  }
};

//Set static file location
app.use("/static", express.static(path.join(__dirname, "public")));

//Set view file location and type
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Display page at /
app.get("/", (req, res) => {
  console.log(githubData);

  res.render("index");
});

//Make app live at port
app.listen(port, () => {
  console.log(
    `Portfolio app listening on port ${port} at http://localhost:${port}/`
  );
});
