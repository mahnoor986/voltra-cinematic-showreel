const express = require("express");

const app = express();
const siteRoot = __dirname;

app.use(express.static(siteRoot, { index: "index.html" }));

app.get("/", (req, res) => {
  res.sendFile(`${siteRoot}/index.html`);
});

module.exports = app;