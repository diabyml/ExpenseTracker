require("dotenv").config();
const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo.service");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function main() {
  mongoConnect();
  server.listen(PORT, () =>
    console.log(`Listenning at http://localhost:${PORT}`)
  );
}

main().catch((err) => console.error("Server err: ", err));
