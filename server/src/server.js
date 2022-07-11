require("dotenv").config();
const fs = require("fs");
const path = require("path");
const https = require("https");
const app = require("./app");
const { mongoConnect } = require("./services/mongo.service");

const PORT = process.env.PORT || 8000;

const server = https.createServer(
  {
    cert: fs.readFileSync(path.join(__dirname, "..", "cert.pem")),
    key: fs.readFileSync(path.join(__dirname, "..", "key.pem")),
  },

  app
);

async function main() {
  mongoConnect();
  server.listen(PORT, () =>
    console.log(`Listenning at https://localhost:${PORT}`)
  );
}

main().catch((err) => console.error("Server err: ", err));
