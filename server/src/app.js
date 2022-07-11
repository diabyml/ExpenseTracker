const path = require("path");
const express = require("express");
const helmet = require("helmet");
const { v1Router } = require("./services/api.service");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/v1", v1Router);

app.get("/*", (_, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
