const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const siteRoot = __dirname;

app.use(express.static(siteRoot, { index: "index.html" }));

app.listen(port, () => {
  console.log(`Voltra is running at http://localhost:${port}`);
});