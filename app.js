//*Imports
//#region
//Import path
const path = require("path");

//Import dotenv
require("dotenv").config();

//Import express
const express = require("express");
const app = express();

//Import session
const session = require("express-session");

//Import uuid
const { v4: uuidv4 } = require("uuid");
//#endregion

//*Setup middleware
//#region
//Specify port
//Json setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set static file location
app.use("/static", express.static(path.join(__dirname, "public")));

//Set view file location and type
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Session setup
app.use(
  session({
    name: "SessionId",
    genid: function (req) {
      console.log("session id created");
      return uuidv4();
    },
    secret: "Shsh!Secret!",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, expires: 60000 },
  })
);

const port =
  process.env.STATUS === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;

//#endregion

//*Route implementation
const get = require("./routes/get");
app.use("/", get);

const post = require("./routes/post");
app.use("/", post);

//*Make app live at port
//#region
app.listen(port, () => {
  console.log(
    `Portfolio app listening on port ${port} at http://localhost:${port}/`
  );
});
//#endregion
