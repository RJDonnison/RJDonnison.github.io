const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/", function (_req, res) {
  res.render("hub");
});

router.get("/*", async function (req, res) {
  //*Information i need - base color

  let string = req.url
    .split("/")[1]
    .replace(/-([a-z])/g, (_, char) => "-" + char.toUpperCase());
  const link = string.charAt(0).toUpperCase() + string.slice(1);

  // if (link.split(".js").length > 1) return res.end();

  await axios({
    method: "get",
    url: `https://api.github.com/repos/rjdonnison/${link}`,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
    },
  }).then((response) => {
    return (
      (description = response.data.description),
      (languages = response.data.topics)
    );
  });

  const title = link.replace("-", " ");

  const image = `/images${req.url}.png`;

  res.render("about", {
    title: title,
    link: link,
    description: description,
    languages: languages,
    image: image,
  });
});

module.exports = router;
