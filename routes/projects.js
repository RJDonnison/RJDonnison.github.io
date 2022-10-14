import express from "express";
const router = express.Router();

import axios from "axios";

router.get("/", function (_req, res) {
  res.render("hub");
});

router.get("/*", async function (req, res) {
  let string = req.url
    .split("/")[1]
    .split("?")[0]
    .replace(/-([a-z])/g, (_, char) => "-" + char.toUpperCase());
  const link = string.charAt(0).toUpperCase() + string.slice(1);

  await axios({
    method: "get",
    url: `https://api.github.com/repos/rjdonnison/${link}`,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json",
    },
  }).then((response) => {
    return (
      (description = response.data.description),
      (languages = response.data.topics)
    );
  });

  const title = link.replace("-", " ");

  const image = `/images/${string}.png`;

  const color = req.query.color;

  res.render("about", {
    title: title,
    link: link,
    description: description,
    languages: languages,
    image: image,
    color: color,
  });
});

module.exports = router;
