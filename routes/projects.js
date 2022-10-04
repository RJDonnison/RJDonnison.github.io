var express = require("express");
const router = express.Router();

router.get("/", function (_req, res) {
  res.render("hub");
});

router.get("*", function (req, res) {
  //*Information i need - description, base color, languages

  let string = req.url
    .split("/")[1]
    .replace(/-([a-z])/g, (_, char) => "-" + char.toUpperCase());
  const link = string.charAt(0).toUpperCase() + string.slice(1);
  const title = link.replace("-", " ");
  console.log(title + " link: " + link);
  const image = `/images${req.url}.png`;
  res.render("about", {
    title: title,
    link: link,
    description: "test",
    image: image,
  });
});

module.exports = router;
