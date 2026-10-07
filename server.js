const path = require("path");
const express = require("express");

const app = express();
const siteRoot = __dirname;
const pages = ["index", "bikes", "technology", "about", "contact", "showcase"];

// Only expose the site's assets, not server code, package files or design sources.
app.use("/css", express.static(path.join(siteRoot, "css")));
app.use("/js", express.static(path.join(siteRoot, "js")));
app.use("/images", express.static(path.join(siteRoot, "images")));

app.get("/", (req, res) => {
  res.sendFile(path.join(siteRoot, "index.html"));
});

pages.forEach((page) => {
  app.get([`/${page}.html`, `/${page}`], (req, res) => {
    res.sendFile(path.join(siteRoot, `${page}.html`));
  });
});

app.use((req, res) => {
  res.status(404).type("text").send("Not found");
});

// Vercel imports the app; `npm start` runs this file directly and needs a listener.
if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Voltra running at http://localhost:${port}`);
  });
}

module.exports = app;
